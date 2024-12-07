const Resource = require("../models/Resource");

// Get all resources
exports.getAllResources = async (req, res) => {
  try {
    const resources = await Resource.find()
      .sort({ createdAt: -1 }); // Sort by newest first
    
    res.status(200).json({
      success: true,
      resources
    });
  } catch (error) {
    console.error('Error fetching resources:', error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch resources"
    });
  }
};

// Add new resource
exports.addResource = async (req, res) => {
  try {
    const { title, description, link, category } = req.body;

    // Validate required fields
    if (!title || !description || !link || !category) {
      return res.status(400).json({
        success: false,
        error: "Please provide all required fields"
      });
    }

    // Create new resource
    const resource = new Resource({
      title,
      description,
      link,
      category
    });

    await resource.save();

    res.status(201).json({
      success: true,
      resource
    });
  } catch (error) {
    console.error('Error adding resource:', error);
    res.status(500).json({
      success: false,
      error: "Failed to add resource"
    });
  }
};

// Update resource
exports.updateResource = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const resource = await Resource.findByIdAndUpdate(
      id,
      updates,
      { new: true, runValidators: true }
    );

    if (!resource) {
      return res.status(404).json({
        success: false,
        error: "Resource not found"
      });
    }

    res.status(200).json({
      success: true,
      resource
    });
  } catch (error) {
    console.error('Error updating resource:', error);
    res.status(500).json({
      success: false,
      error: "Failed to update resource"
    });
  }
};

// Delete resource
exports.deleteResource = async (req, res) => {
  try {
    const { id } = req.params;
    
    const resource = await Resource.findByIdAndDelete(id);

    if (!resource) {
      return res.status(404).json({
        success: false,
        error: "Resource not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Resource deleted successfully"
    });
  } catch (error) {
    console.error('Error deleting resource:', error);
    res.status(500).json({
      success: false,
      error: "Failed to delete resource"
    });
  }
};