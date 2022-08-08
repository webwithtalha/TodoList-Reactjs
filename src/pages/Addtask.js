import axios from '../utils/axios';
// import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import { MdDeleteForever } from 'react-icons/md';
import { BiEdit } from 'react-icons/bi';
import Header from '../components/Header';
import EditTaskPopup from '../components/EditTaskPopup';
import { Link } from 'react-router-dom';

const Addtask = () => {
  const inputTask = useRef();
  const editedTask = useRef();
  const [tasks, setTasks] = useState([]);
  const [showModel, setShowModel] = useState(false);

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
    const body = inputTask.current.innerText;
    axios
      .post(`${process.env.REACT_APP_API_URL}/api/addTask`, { task: body })
      .then((jsonRes) => {
        setTasks((prev) => {
          return [jsonRes.data.new_task, ...prev];
        });
        inputTask.current.innerText = '';
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
        <div
          ref={inputTask}
          contentEditable={true}
          data-placeholder="Write a task..."
          className="inputPlaceHolder py-[11px] px-5 max-w-[700px] flex-grow outline-brand-5 font-poppins text-sm border-brand-5 border rounded-lg"></div>
        <button
          onClick={addTask}
          className="py-[11px] px-5 flex bg-brand-4 w-fit text-sm text-white font-poppins rounded-lg">
          Add Task
        </button>
      </div>
      <div className="ml-[90px] mt-[3%]">
        <div className="flex gap-10 flex-wrap w-full">
          {tasks.length > 0 ? (
            tasks.map((t) => {
              return (
                <div key={t.id}>
                  <div className="sm:w-[250px] xs:w-[200px] flex justify-between gap-2 bg-brand-3 mb-3 bg-opacity-20 h-36 rounded text-brand-3 font-bold font-poppins p-2.5">
                    <div className="break-all flex max-h-[124px] scrollSet pr-1 overflow-y-scroll flex-grow-1 w-fit">
                      {t.task}
                    </div>
                    <div className="flex gap-2">
                      <MdDeleteForever
                        onClick={() => deleteTask(t._id)}
                        className=" min-w-[18px] text-red-600 text-[20px] hover:scale-125"
                      />
                      <Link to={`?id=${t._id}`} onClick={() => setShowModel(true)}>
                        <BiEdit className=" min-w-[18px] text-red-600 text-[20px] hover:scale-125" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-brand-3 text-[40px] w-full flex justify-center items-center font-poppins mt-10">
              No task will be added yet!
            </div>
          )}
        </div>
      </div>
      {showModel && (
        <EditTaskPopup setShowModel={setShowModel} editedTask={editedTask} setTasks={setTasks} />
      )}
    </div>
  );
};

export default Addtask;
