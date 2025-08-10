// next.config.js
const nextConfig = {
  images: {
    domains: [
      'www.image.com',
      'flagcdn.com', // Changed from www.flagcdn.com
      'www.flagcdn.com', // Can keep both if needed
      'res.cloudinary.com',
       'assets.gadgetandgear.com',
      'adminapi.applegadgetsbd.com',
      'www.static-src.com',
      'i.ibb.co.com',
    ],
  },
  // ... other config options
  staticPageGenerationTimeout: 300
}

module.exports = nextConfig