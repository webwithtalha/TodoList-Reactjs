import axios from '../utils/axios';
// import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import { MdDeleteForever } from 'react-icons/md';
import { BiEdit } from 'react-icons/bi';
import Header from '../components/Header';
import EditTaskPopup from '../components/EditTaskPopup';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ImSpinner7 } from 'react-icons/im';
import { toast } from 'react-toastify';

const Addtask = () => {
  const inputTask = useRef();
  const editedTask = useRef();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState('idle');
  const [showModel, setShowModel] = useState(false);

  useEffect(() => {
    setLoading('loading');
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/getTask`)
      .then((jsonRes) => {
        setTasks(jsonRes.data.tasks);
        setLoading('loaded');
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  async function sendClickHandler(e) {
    const btn = e.currentTarget;
    if (btn.disabled) {
      return;
    }
    btn.disabled = true;
    try {
      await addTask();
      btn.disabled = false;
    } catch (error) {
      btn.disabled = false;
      console.log(error);
    }
  }

  async function ctrlEnterHandler(e) {
    if (e.ctrlKey && e.code === 'Enter') {
      try {
        await addTask();
      } catch (error) {
        console.log(error);
      }
    }
  }

  const addTask = () => {
    const body = inputTask.current.innerText;
    if (body.trim() === '') {
      toast.error('Task field is required!', {
        theme: 'dark',
        position: 'bottom-right',
        autoClose: 5000
      });
      return;
    }
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
          onKeyPress={ctrlEnterHandler}
          className="inputPlaceHolder py-[11px] px-5 max-w-[700px] flex-grow outline-brand-5
          font-poppins text-sm border-brand-5 border rounded-lg"></div>
        <button
          onClick={sendClickHandler}
          className="py-[11px] px-5 flex bg-brand-4 w-fit text-sm text-white font-poppins rounded-lg">
          Add Task
        </button>
      </div>
      <div className="ml-[90px] mt-[3%]">
        <div className="flex gap-10 flex-wrap w-full">
          {tasks.length > 0 &&
            loading === 'loaded' &&
            tasks.map((t) => {
              return (
                <div key={t.id}>
                  <motion.div
                    className="sm:w-[250px] xs:w-[200px] flex justify-between gap-2 bg-brand-3 mb-3 bg-opacity-20 h-36 rounded text-brand-3 font-bold font-poppins p-2.5"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      duration: 0.8,
                      delay: 0.5,
                      ease: [0, 0.71, 0.2, 1.01]
                    }}>
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
                  </motion.div>
                </div>
              );
            })}
          {loading === 'loaded' && tasks.length < 1 && (
            <div className="text-brand-3 text-[40px] w-full flex justify-center items-center font-poppins mt-10">
              No task will be added yet!
            </div>
          )}
          {loading === 'loading' && (
            <div className="text-brand-3 text-[40px] w-full flex justify-center items-center font-poppins mt-10">
              <button type="submit" className="btn-primary inline-flex items-center group">
                <span>loading...</span>
                <ImSpinner7 className="ml-2 animate-spin" />
              </button>
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
