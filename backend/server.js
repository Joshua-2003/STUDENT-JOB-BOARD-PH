import app from "./app.js";

const PORT = process.env.PORT || 3000;

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📝 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`🔗 Health check: http://localhost:${PORT}/health`);
    console.log(`📋 Client API: http://localhost:${PORT}/api/client`);
});