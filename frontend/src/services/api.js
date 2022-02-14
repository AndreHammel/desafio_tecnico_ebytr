import axios from 'axios';

const api = axios.create({ baseURL: 'http://localhost:4000' });

const http = {
  getAllTasks: async () => {
    try {
      const response = await api.get('/task');
      return response.data;
    } catch (error) {
      return error.response.status;
    }
  },
  createNewTask: async ({ newtask: task, employee, status }) => {
    try {
      const response = await api.post('/task/new-task', {
        task,
        employee,
        status,
      });
      return response.data;
    } catch (error) {
      return error.response.status;
    }
  },
  removeTaskById: async ({ id: _id }) => {
    try {
      const response = await api.delete('/task/remove-task', {
        data: { _id },
      });
      return response.data;
    } catch (error) {
      return error.response.status;
    }
  },
  updateTaskById: async (taskObj) => {
    try {
      const response = await api.put('/task/update-task', { ...taskObj });
      return response.data;
    } catch (error) {
      return error.response.status;
    }
  },
};

export default http;
