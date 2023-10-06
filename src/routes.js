import { randomUUID } from "node:crypto";
import { buildRoutePath } from "./utils/build-route-path.js";

const tasks = [{
  id:"1",
  title:"Titulo",
  description:"Lavar algo",
  completed_at:null,
  created_at:"05/10/2023",
  updated_at:"05/10/2023"
}]

export const routes = [
  {
    method: "GET",
    path:buildRoutePath("/tasks"),
    handler: (req,res) => {
      return res.end(JSON.stringify(tasks))
    } 
  },

  {
    method: "POST",
    path:buildRoutePath("/tasks"),
    handler: (req,res) => {
      const {title,description} = req.body;
      if(!title || !description){
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        return res.end('Missing required information in the request body.');
      }
        tasks.push({
          id:randomUUID(),
          title,
          description,
          completed_at: null,
          created_at:"05/10/2023",
          updated_at:"05/10/2023"
    })
        return res.writeHead(201).end()
      }
    
  },
  {
    method: "PUT",
    path:buildRoutePath("/tasks/:id"),
    handler: (req,res) => {
      const {id} = req.params;
      const {title, description} = req.body
      const taskIndex = tasks.findIndex((task) => {
        return  task.id === id
      }
      )

      if(taskIndex === -1){
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        return res.end('There is no resource with the specified ID.');
      } else if(!title || !description){
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        return res.end('Missing required information in the request body.');
      }

      tasks[taskIndex] = {
        title,
        description,
        updated_at_at:Date(),...tasks[taskIndex]}

      return res.writeHead(204).end()
    } 
  },
  {
    method: "PATCH",
    path:buildRoutePath("/tasks/:id/complete"),
    handler: (req,res) => {
      const {id} = req.params;
      const taskIndex = tasks.findIndex((task) => {
        return  task.id === id
      }
      )

      if(taskIndex === -1){
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        return res.end('There is no resource with the specified ID.');
      }

      tasks[taskIndex] = {
        completed_at : Date(),
        updated_at_at : Date(),
        ...  tasks[taskIndex]
      }
      return res.writeHead(204).end()
     
    } 
  },
  {
    method: "DELETE",
    path:buildRoutePath("/tasks/:id"),
    handler: (req,res) => {
      const {id} = req.params;
      const taskIndex = tasks.findIndex((task) => {
        return  task.id === id
      })
      if(taskIndex === -1){
        res.writeHead(404, { 'Content-Type': 'text/plain' });
       return res.end('There is no resource with the specified ID.');
      }
      tasks.splice(taskIndex,1)
      return res.writeHead(204).end()
    
    }
  }]