const express = require('express');
const router = express.Router();
const AvailableTask = require('../models/AvailableTask');
const PendingTask = require('../models/PendingTask');

// GET /api/volunteer/tasks - Get all available tasks
router.get('/tasks', async (req, res) => {
  try {
    const tasks = await AvailableTask.find({ status: 'Available' });
    res.status(200).json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching tasks' });
  }
});

// POST /api/volunteer/tasks - Create a new task
router.post('/tasks', async (req, res) => {
  try {
    console.log('Creating new task with data:', req.body);
    const newTask = new AvailableTask(req.body);
    await newTask.save();
    console.log('Task created successfully:', newTask);
    res.status(201).json({ message: 'Task created successfully', task: newTask });
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ message: 'Failed to create task', error: error.message });
  }
});

// GET /api/volunteer/pending-tasks - Get all pending tasks
router.get('/pending-tasks', async (req, res) => {
  try {
    const tasks = await PendingTask.find().populate('taskId');
    res.status(200).json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching pending tasks' });
  }
});

// POST /api/volunteer/tasks/:taskId/accept - Accept a task
router.post('/tasks/:taskId/accept', async (req, res) => {
  try {
    const { taskId } = req.params;
    const { volunteerName, volunteerContact } = req.body;

    // Create new pending task
    const pendingTask = new PendingTask({
      taskId,
      volunteerName,
      volunteerContact,
      deliveryStatus: 'Pending'
    });

    await pendingTask.save();

    // Update available task status
    await AvailableTask.findByIdAndUpdate(taskId, { status: 'Accepted' });

    res.status(201).json({ 
      message: 'Task accepted successfully',
      pendingTask 
    });
  } catch (error) {
    console.error('Error accepting task:', error);
    res.status(500).json({ message: 'Failed to accept task' });
  }
});

// PUT /api/volunteer/pending-tasks/:taskId/deliver - Mark task as delivered
router.put('/pending-tasks/:taskId/deliver', async (req, res) => {
  try {
    const { taskId } = req.params;
    const task = await PendingTask.findByIdAndUpdate(
      taskId,
      { deliveryStatus: 'Delivered' },
      { new: true }
    );
    res.status(200).json({ message: 'Task marked as delivered', task });
  } catch (error) {
    console.error('Error marking task as delivered:', error);
    res.status(500).json({ message: 'Failed to mark task as delivered' });
  }
});

// PUT /api/volunteer/pending-tasks/:taskId/confirm-delivery - Confirm delivery and delete task
router.put('/pending-tasks/:taskId/confirm-delivery', async (req, res) => {
  try {
    const { taskId } = req.params;
    
    // Find the pending task
    const pendingTask = await PendingTask.findById(taskId);
    if (!pendingTask) {
      return res.status(404).json({ message: 'Pending task not found' });
    }

    // Verify that the task is in 'Delivered' status
    if (pendingTask.deliveryStatus !== 'Delivered') {
      return res.status(400).json({ message: 'Task must be marked as delivered first' });
    }

    // Delete the pending task
    await PendingTask.findByIdAndDelete(taskId);

    // Also delete the associated available task if it exists
    if (pendingTask.taskId) {
      await AvailableTask.findByIdAndDelete(pendingTask.taskId);
    }

    res.status(200).json({ 
      message: 'Delivery confirmed and task removed successfully',
      taskId: taskId
    });
  } catch (error) {
    console.error('Error confirming delivery:', error);
    res.status(500).json({ message: 'Failed to confirm delivery' });
  }
});

module.exports = router;