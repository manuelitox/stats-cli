const ResourceType = stats => stats.isDirectory() ? 'directory' : 'file';

module.exports = ResourceType;