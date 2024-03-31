import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Todo from "../Todo/Todo";
import { getTasksPerPage, updatePageNumber } from "../../actions/taskActions"; 
import { useSelector, useDispatch } from 'react-redux'; 
import './TodoList.css';

const TodoList = ({ pages, isAuthenticated, getTasksPerPage, sortBy }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [tasksPerPage] = useState(3);
  const dispatch = useDispatch(); 

  useEffect(() => {
    getTasksPerPage(currentPage, sortBy);
  }, []); 

  const my_tasks = useSelector(state => state.tasks.tasks);

  const paginate = async (pageNumber) => {
    if (pageNumber !== currentPage) {
      await getTasksPerPage(pageNumber, sortBy);
      setCurrentPage(pageNumber);
      dispatch(updatePageNumber(pageNumber));
    }
  };

  const renderPagination = () => {
    const pagination = [];
    for (let i = 1; i <= pages; i++) {
      if (i === 1 || i === pages || (i >= currentPage - 1 && i <= currentPage + 1)) {
        pagination.push(
          <li key={i} className={`page-item ${i === currentPage ? 'active' : ''}`}>
            <button className={`page-link ${i === currentPage ? 'clicked' : ''}`} onClick={() => paginate(i)}>
              {i}
            </button>
          </li>
        );
      } else if (pagination[pagination.length - 1] !== '...') {
        pagination.push(<li key={i} className="page-item disabled"><span className="page-link">...</span></li>);
      }
    }
    return pagination;
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <ul className="list-group">
            {my_tasks.map(task => (
              <Todo key={task.id} task={task} isAuthenticated={isAuthenticated} />
            ))}
          </ul>
          <nav aria-label="Page navigation">
            <ul className="pagination justify-content-center mt-4 horizontal-pagination">
              {renderPagination()}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  tasks: state.tasks.tasks,
  pages: state.tasks.pages,
  isAuthenticated: state.auth.isAuthenticated,
  sortBy: state.tasks.sortBy
});

const mapDispatchToProps = {
  getTasksPerPage
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
