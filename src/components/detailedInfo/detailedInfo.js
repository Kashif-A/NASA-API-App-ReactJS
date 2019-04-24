import React from "react";
import "./detailedInfo.css";
import { Link } from "react-router-dom";
import ItemLinks from "../itemLinks/itemLinks";

// Component to display detailed results of one single item within the API results depending on user choice.
// Shows Title, image, NASA ID, Center, Date Created and Description.
class DetailedInfo extends React.Component {
  render() {
      
    // Local variables to store props for readibility purposes
    let nasaTitle = this.props.location.state.data.data[0].title;
    let nasaImage = this.props.location.state.data.links[0].href.toString();
    let nasaID = this.props.location.state.data.data[0].nasa_id;
    let nasaCenter = this.props.location.state.data.data[0].center;
    let nasaDateCreated = this.props.location.state.data.data[0].date_created;
    let nasaDescription = this.props.location.state.data.data[0].description.trim();

    return (
      <>
        <div className="container">
          <div className="row ">
            <div className="col-md-2" />
            <div className="col-md-8 listItem">
              <div>
                <Link to="/">
                  <div className="btn btn-danger btnNotMain">Back</div>
                </Link>
                <h3 className="dataHolderTitle text-center">{nasaTitle}</h3>
                <img
                  alt="Nasa Img"
                  align="center"
                  className="NASAImageDetailed"
                  src={nasaImage}
                />
                <br /> <br />
                <div className="itemInfo">
                  <h6 className="itemHeading">
                    NASA ID&nbsp;&nbsp;
                    <p className="itemParagraph">
                      <em>{nasaID.toUpperCase()}</em>
                    </p>
                  </h6>
                  <p className="itemParagraph">
                    <strong>Center:&nbsp;&nbsp;</strong>
                    {nasaCenter}
                  </p>
                  <p className="itemParagraph">
                    <strong>Date Created:&nbsp;&nbsp;</strong>
                    {nasaDateCreated}
                  </p>
                  <p className="itemParagraph">
                    <strong>Description:&nbsp;&nbsp;</strong>
                    {nasaDescription}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-2" />
          </div>
        </div>
        <div className="container linksContainer">
          <div className="row">
            <div className="col-sm-12">
              <ItemLinks nasaID={nasaID} />
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default DetailedInfo;
