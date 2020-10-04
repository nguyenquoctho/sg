import React from "react";
import "./style.css";
export default class ProjectItem extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="project-item">
        <img className="project-img" src="./images/project.jpg" />
      </div>
    );
  }
}
