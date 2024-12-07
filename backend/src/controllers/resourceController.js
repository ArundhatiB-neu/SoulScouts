const Resource = require("../models/Resource");

// Fetch all resources
exports.getAllResources = async (req, res) => {
  try {
    const resources = await Resource.find();
    res.status(200).json({
      message: "Resources fetched successfully.",
      resources,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching resources." });
  }
};

// Add a new resource
exports.addResource = async (req, res) => {
  const { title, description, link, category } = req.body;

  if (!title || !description || !link || !category) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    const newResource = new Resource({ title, description, link, category });
    const savedResource = await newResource.save();
    res.status(201).json({
      message: "Resource added successfully.",
      resource: savedResource,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while adding the resource." });
  }
};
