// controllers/fileStructureController.js

const { FileModel } = require('../models/fileModel');
const path = require('path');

// Function to get file structure based on project name
async function getFileStructureByProject(projectName) {
    try {
        const files = await FileModel.find({ project: projectName });

        const fileStructure = {};

        files.forEach(file => {
            if(file.path && file.version){

                const filePath = path.relative('static', file.path);
                const versionedFilePath = path.relative('versions', file.version);
    
                // Split the file path into an array
                const filePathArray = filePath.split(path.sep);
    
                // Build the file structure
                let currentLevel = fileStructure;
                filePathArray.forEach((folder, index) => {
                    currentLevel[folder] = currentLevel[folder] || {};
    
                    if (index === filePathArray.length - 1) {
                        // Leaf node representing the file
                        currentLevel[folder] = {
                            filename: file.filename,
                            version: versionedFilePath,
                            commitMessage: file.commitMessage,
                            commitId: file.commitId,
                            timestamp: file.timestamp,
                            tag: file.tag,
                            filepath: `${process.env.IP}/download/${encodeURIComponent(file.path)}`,
                        };
                    }
    
                    currentLevel = currentLevel[folder];
                });
            }
        });

        return fileStructure;
    } catch (error) {
        console.error(error);
        throw new Error('Failed to fetch file structure.');
    }
}
async function getAllProjectsFileStructure() {
    try {
        // Get a list of unique project names from the database
        const projects = await FileModel.distinct('project');

        // Create an object to store the file structure for each project
        const allProjectsFileStructure = [];

        // Fetch file structure for each project
        for (const project of projects) {
            const projectFileStructure = await getFileStructureByProject(project);
            allProjectsFileStructure.push(projectFileStructure);
        }

        return allProjectsFileStructure;
    } catch (error) {
        console.error(error);
        throw new Error('Failed to fetch file structure for all projects.');
    }
}

async function getAllProjects(req, res, next) {
    try {
        console.log('Fetching projects')
        const projects = await FileModel.distinct('project');
        res.json(projects);
    } catch (error) {
        console.error(error);
        res.json({ error: 'Internal Server Error' })
    }
}

module.exports = {
    getFileStructureByProject,
    getAllProjectsFileStructure,
    getAllProjects
};
