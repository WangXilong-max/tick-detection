# 🕷️ Tick Detection App

A full-stack application for detecting ticks in images using AI (YOLO) with a React frontend and FastAPI backend.

## 🏗️ Architecture

- **Frontend**: React + TypeScript + Tailwind CSS
- **Backend**: FastAPI + Python + YOLO (Ultralytics)
- **AI Model**: YOLOv11 trained for tick detection
- **Storage**: AWS S3 for model and prediction storage
- **Hosting**: S3 Static Website + EC2 Instance

## 🚀 Quick Start

### Prerequisites
- Python 3.8+
- Node.js 16+
- AWS CLI configured
- EC2 instance running

### Local Development

1. **Backend Setup**
   ```bash
   pip install -r requirements.txt
   python main.py
   ```

2. **Frontend Setup**
   ```bash
   cd "tick detection_app"
   npm install
   npm run dev
   ```

3. **Access URLs**
   - Frontend: http://localhost:3000
   - Backend: http://localhost:8000
   - API Docs: http://localhost:8000/docs

## 🚀 Production Deployment

Use the automated deployment script:

```bash
./deploy.sh
```

This script will:
- Build the React app
- Deploy to S3 bucket
- Update the FastAPI backend on EC2
- Restart the server

## 📁 Project Structure

```
Tick-detection/
├── main.py                 # FastAPI backend
├── requirements.txt        # Python dependencies
├── deploy.sh              # Deployment script
├── .gitignore            # Git ignore rules
├── test_image.jpeg       # Test image
├── tick-detection.ipynb  # Jupyter notebook
└── tick detection_app/    # React frontend
    ├── src/              # React source code
    ├── package.json      # Node dependencies
    └── vite.config.ts    # Vite configuration
```

## 🔧 Configuration

### Environment Variables
Create a `.env` file with:
```bash
AWS_ACCESS_KEY_ID=your_key
AWS_SECRET_ACCESS_KEY=your_secret
AWS_DEFAULT_REGION=us-east-1
```

### S3 Bucket
- **Frontend**: `tick-detection-react-app`
- **Model Storage**: `tickdetectionbucket`

### EC2 Instance
- **Host**: 3.91.241.212
- **User**: ubuntu
- **Port**: 8000

## 📱 Features

- **AI-Powered Detection**: YOLO model for accurate tick identification
- **Real-time Processing**: Fast image analysis with bounding boxes
- **Responsive UI**: Mobile-first design with modern interface
- **S3 Integration**: Automatic image storage and retrieval
- **API Documentation**: Interactive FastAPI docs

## 🔌 API Endpoints

- `POST /predict` - Upload image for tick detection
- `GET /health` - Server health check
- `GET /predictions` - List all predictions
- `GET /image/{id}` - Get prediction image
- `GET /docs` - Interactive API documentation

## 🛠️ Development

### Adding New Features
1. Make changes to code
2. Test locally
3. Run `./deploy.sh` to deploy

### Backend Development
- Edit `main.py` for API changes
- Update `requirements.txt` for new dependencies
- Test with `python main.py`

### Frontend Development
- Edit files in `tick detection_app/src/`
- Use `npm run dev` for local development
- Build with `npm run build`

## 📊 Model Information

- **Framework**: Ultralytics YOLO
- **Model**: Custom trained on tick dataset
- **Input**: JPEG/PNG images
- **Output**: Bounding boxes with confidence scores
- **Device**: CPU optimized

## 🔒 Security

- CORS enabled for cross-origin requests
- S3 bucket policies configured
- EC2 security groups configured
- No sensitive data in code

## 📝 License

This project is for educational and research purposes.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For issues or questions:
1. Check the deployment logs
2. Verify AWS credentials
3. Check EC2 instance status
4. Review API documentation
