#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
REACT_APP_DIR="tick_detection_app"
EC2_HOST="3.91.241.212"
EC2_USER="ubuntu"
EC2_KEY="tick_detection_server_key_pair.pem"
S3_BUCKET="tick-detection-react-app"
AWS_REGION="us-east-1"

echo -e "${BLUE}Starting automated deployment of Tick Detection App...${NC}"
echo "=================================================="

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Function to print status
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

# Check prerequisites
print_status "Checking prerequisites..."

if ! command_exists aws; then
    print_error "AWS CLI is not installed. Please install it first."
    exit 1
fi

if ! command_exists ssh; then
    print_error "SSH is not available. Please check your SSH configuration."
    exit 1
fi

if [ ! -f "$EC2_KEY" ]; then
    print_error "EC2 key file not found: $EC2_KEY"
    exit 1
fi

if [ ! -d "$REACT_APP_DIR" ]; then
    print_error "React app directory not found: $REACT_APP_DIR"
    exit 1
fi

print_success "Prerequisites check passed!"

# Check AWS credentials
print_status "Checking AWS credentials..."
if ! aws sts get-caller-identity >/dev/null 2>&1; then
    print_error "AWS credentials not configured or invalid. Please run 'aws configure' first."
    exit 1
fi

AWS_ACCOUNT=$(aws sts get-caller-identity --query Account --output text)
print_success "AWS credentials valid. Account: $AWS_ACCOUNT"

# Step 1: Build React App
echo ""
print_status "Step 1: Building React App..."
cd "$REACT_APP_DIR"

if [ ! -d "node_modules" ]; then
    print_status "Installing React dependencies..."
    npm install
    if [ $? -ne 0 ]; then
        print_error "Failed to install React dependencies!"
        exit 1
    fi
fi

print_status "Building React app for production..."
npm run build

if [ $? -ne 0 ]; then
    print_error "React build failed!"
    exit 1
fi

if [ ! -d "dist" ]; then
    print_error "Build directory 'dist' not found!"
    exit 1
fi

print_success "React app built successfully!"

# Step 2: Deploy React App to S3
echo ""
print_status "Step 2: Deploying React App to S3..."
print_status "Uploading files to s3://$S3_BUCKET..."

aws s3 sync dist/ s3://$S3_BUCKET --delete --region $AWS_REGION

if [ $? -ne 0 ]; then
    print_error "Failed to upload React app to S3!"
    exit 1
fi

print_success "React app deployed to S3 successfully!"
print_status "Your app is available at: http://$S3_BUCKET.s3-website-$AWS_REGION.amazonaws.com/"

# Step 3: Deploy FastAPI Backend to EC2
echo ""
print_status "Step 3: Deploying FastAPI Backend to EC2..."

cd ..

# Check if main.py exists
if [ ! -f "main.py" ]; then
    print_error "main.py not found in project root!"
    exit 1
fi

print_status "Copying main.py to EC2 server..."
scp -i "$EC2_KEY" main.py "$EC2_USER@$EC2_HOST:~/" 2>/dev/null

if [ $? -ne 0 ]; then
    print_error "Failed to copy main.py to EC2!"
    exit 1
fi

print_success "main.py copied to EC2 successfully!"

# Restart FastAPI server on EC2
print_status "Restarting FastAPI server on EC2..."

# Kill existing server
print_status "Stopping existing server..."
ssh -i "$EC2_KEY" "$EC2_USER@$EC2_HOST" "pkill -f 'python main.py'" 2>/dev/null

# Wait a moment for the process to be killed
sleep 3

# Start new server with timeout
print_status "Starting new server..."
ssh -i "$EC2_KEY" -o ConnectTimeout=10 -o ServerAliveInterval=60 "$EC2_USER@$EC2_HOST" "cd ~ && source tick_api_env/bin/activate && nohup python main.py > app.log 2>&1 & echo 'Server started with PID:' \$!" 2>/dev/null

if [ $? -ne 0 ]; then
    print_error "Failed to restart FastAPI server on EC2!"
    print_status "Trying alternative method..."
    
    # Alternative: start server in background
    ssh -i "$EC2_KEY" -o ConnectTimeout=10 "$EC2_USER@$EC2_HOST" "cd ~ && source tick_api_env/bin/activate && nohup python main.py > app.log 2>&1 &" 2>/dev/null
    
    if [ $? -ne 0 ]; then
        print_error "Alternative method also failed!"
        print_warning "Please manually restart the server on EC2"
        print_status "Manual command: ssh -i $EC2_KEY $EC2_USER@$EC2_HOST 'cd ~ && source tick_api_env/bin/activate && nohup python main.py > app.log 2>&1 &'"
    else
        print_success "FastAPI server restarted on EC2 (alternative method)!"
    fi
else
    print_success "FastAPI server restarted on EC2!"
fi

# Wait for server to start
print_status "Waiting for server to start..."
sleep 10

# Test if server is running
print_status "Testing server health..."
if curl -s --connect-timeout 10 "http://$EC2_HOST:8000/health" >/dev/null 2>&1; then
    print_success "FastAPI server is running and healthy!"
    print_status "Backend API available at: http://$EC2_HOST:8000/"
else
    print_warning "FastAPI server might not be fully started yet. Please check manually."
    print_status "You can check the server status with: curl http://$EC2_HOST:8000/health"
fi

# Final status
echo ""
echo "=================================================="
print_success "Deployment completed successfully!"
echo ""
echo "React App: http://$S3_BUCKET.s3-website-$AWS_REGION.amazonaws.com/"
echo "FastAPI Backend: http://$EC2_HOST:8000/"
echo "API Documentation: http://$EC2_HOST:8000/docs"
echo ""
echo "To test the full integration:"
echo "   1. Open the React app URL in your browser"
echo "   2. Upload an image for tick detection"
echo "   3. Check if predictions are working"
echo ""
print_status "Deployment script completed!"
