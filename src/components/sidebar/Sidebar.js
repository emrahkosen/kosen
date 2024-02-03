import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Sidebar.css';

const Sidebar = (props) => {
  
  return (
    <div className="sidebar">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav flex-column">
            {props.experiences.map(experience => <li className="nav-item">
              <a className="nav-link" href="/">
                {experience.name}
              </a>
            </li>)}
          </ul>
        </div>
      </nav>
    </div>
  );
};


// const experienceComponent = ({experience}) => {
//   const [show, setShow] = useState(false);
//   const handleClick = () => {
//     setShow(true);
//   }
//   return <div>
//     <h2 onClick={handleClick}>{experience.name}</h2>
//     <StaticModal show = {show} title ={experience.name}/>
//   </div>
// };

export default Sidebar;
