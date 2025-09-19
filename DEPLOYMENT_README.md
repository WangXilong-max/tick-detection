# 🚀 Automated Deployment Script

This script automatically deploys both your React app and FastAPI backend with a single command.

## 📋 Prerequisites

Before running the deployment script, ensure you have:

1. **AWS CLI installed and configured** with access to your S3 bucket
2. **SSH access** to your EC2 instance
3. **EC2 key file** (`tick_detection_server_key_pair.pem`) in the project root
4. **Node.js and npm** installed for building the React app

## 🎯 What the Script Does

### Step 1: Build React App
- Installs dependencies if needed
- Builds the production version
- Creates optimized files in `dist/` folder

### Step 2: Deploy to S3
- Uploads React app files to `tick-detection-react-app` bucket
- Configures for static website hosting
- Deletes old files automatically

### Step 3: Deploy FastAPI Backend
- Copies updated `main.py` to EC2 server
- Stops the existing FastAPI server
- Starts the new server with updated code
- Verifies the server is running

## 🚀 Usage

### Deploy Everything
```bash
./deploy.sh
```

### Manual Steps (if needed)
```bash
# Build React app only
cd "tick detection_app"
npm run build

# Deploy to S3 only
aws s3 sync dist/ s3://tick-detection-react-app --delete --region us-east-1

# Deploy backend only
scp -i tick_detection_server_key_pair.pem main.py ubuntu@3.91.241.212:~/
ssh -i tick_detection_server_key_pair.pem ubuntu@3.91.241.212 "pkill -f 'python main.py' && cd ~ && source tick_api_env/bin/activate && nohup python main.py > app.log 2>&1 &"
```

## 🌐 URLs After Deployment

- **React App**: http://tick-detection-react-app.s3-website-us-east-1.amazonaws.com/
- **FastAPI Backend**: http://3.91.241.212:8000/
- **API Documentation**: http://3.91.241.212:8000/docs

## 🔧 Configuration

The script uses these default values (edit `deploy.sh` if needed):

```bash
REACT_APP_DIR="tick detection_app"
EC2_HOST="3.91.241.212"
EC2_USER="ubuntu"
EC2_KEY="tick_detection_server_key_pair.pem"
S3_BUCKET="tick-detection-react-app"
AWS_REGION="us-east-1"
```

## 📝 Troubleshooting

### Common Issues

1. **AWS CLI not configured**
   ```bash
   aws configure
   ```

2. **EC2 key file permissions**
   ```bash
   chmod 400 tick_detection_server_key_pair.pem
   ```

3. **SSH connection issues**
   - Check if EC2 instance is running
   - Verify security group allows SSH (port 22)
   - Ensure key file is correct

4. **Build failures**
   - Check Node.js version compatibility
   - Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`

### Check Server Status

```bash
# Check if FastAPI server is running
curl http://3.91.241.212:8000/health

# Check EC2 server logs
ssh -i tick_detection_server_key_pair.pem ubuntu@3.91.241.212 "tail -f app.log"
```

## 🎉 Success Indicators

The deployment is successful when you see:
- ✅ React app built successfully
- ✅ React app deployed to S3 successfully
- ✅ main.py copied to EC2 successfully
- ✅ FastAPI server restarted on EC2
- ✅ FastAPI server is running and healthy

## 🔄 Making Changes

1. **Edit your code** (React components, FastAPI endpoints, etc.)
2. **Run the deployment script**: `./deploy.sh`
3. **Test the changes** on your live URLs

That's it! Your changes are now live on both frontend and backend.
