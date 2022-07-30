import axios from '../utils/axios';
// import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { MdDeleteForever } from 'react-icons/md';
import Header from '../components/Header';

const Addtask = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/getTask`)
      .then((jsonRes) => {
        setTasks(jsonRes.data.tasks);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const addTask = () => {
    console.log('addtask');

    axios
      .post(`${process.env.REACT_APP_API_URL}/api/addTask`, { task: newTask })
      .then((jsonRes) => {
        setTasks((prev) => {
          return [jsonRes.data.new_task, ...prev];
        });
        setNewTask('');
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/api/deleteTask/${id}`);
      setTasks((prev) => {
        return prev.filter((obj) => {
          return obj._id !== id;
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full h-full">
      <Header />
      <div className="flex mx-10 md:flex-row xs:flex-col gap-3 items-center justify-center mt-10">
        <input
          onChange={(event) => {
            setNewTask(event.target.value);
          }}
          value={newTask}
          type="text"
          className="py-[11px] px-5 max-w-[700px] flex-grow outline-brand-5 font-poppins text-sm border-brand-5 border rounded-lg"
        />
        <button
          onClick={addTask}
          className="py-[11px] px-5 flex bg-brand-4 w-fit text-sm text-white font-poppins rounded-lg">
          Add Task
        </button>
      </div>
      <div className="ml-12 mt-[3%]">
        <div className="flex gap-10 flex-wrap w-full">
          {tasks.length > 0 ? (
            tasks.map((t) => {
              return (
                <div key={t.id}>
                  <p className="sm:w-[250px] xs:w-[200px] flex gap-2 justify-between bg-brand-3 mb-3 bg-opacity-20 h-36 rounded text-brand-3 font-bold font-poppins p-2.5">
                    <div className="break-all flex flex-grow-1 w-fit">{t.task}</div>
                    <MdDeleteForever
                      onClick={() => deleteTask(t._id)}
                      className="w-fit min-w-[24px] text-red-600 text-[25px] hover:scale-125"
                    />
                  </p>
                </div>
              );
            })
          ) : (
            <div className="text-brand-3 text-[40px] flex justify-center font-poppins mt-10">
              No task will be added yet!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Addtask;
