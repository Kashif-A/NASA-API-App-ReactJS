import React from "react";
import "./detailedInfo.css";
import { Link } from "react-router-dom";
import ItemLinks from "../itemLinks/itemLinks";

// Component to display detailed results of one single item within the API results depending on user choice.
// Shows Title, image, NASA ID, Center, Date Created and Description.
class DetailedInfo extends React.Component {
    render() {
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
                                <h3 className="dataHolderTitle text-center">
                                    {this.props.location.state.data.data[0].title}
                                </h3>
                                <img
                                    alt="Nasa Img"
                                    align="center"
                                    className="NASAImageDetailed"
                                    src={
                                        "" + this.props.location.state.data.links[0].href.toString()
                                    }
                                />
                                <br /> <br />
                                <div className="itemInfo">
                                    <h6 className="listItemHeading">
                                        NASA ID&nbsp;&nbsp;
                    <p className="listItemParagraph">
                                            <em>
                                                {this.props.location.state.data.data[0].nasa_id.toUpperCase()}
                                            </em>
                                        </p>
                                    </h6>
                                    <p className="listItemParagraph">
                                        <strong>Center:&nbsp;&nbsp;</strong>
                                        {this.props.location.state.data.data[0].center}
                                    </p>
                                    <p className="listItemParagraph">
                                        <strong>Date Created:&nbsp;&nbsp;</strong>
                                        {this.props.location.state.data.data[0].date_created}
                                    </p>
                                    <p className="listItemParagraph">
                                        <strong>Description:&nbsp;&nbsp;</strong>
                                        {this.props.location.state.data.data[0].description.trim()}
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
                            <ItemLinks
                                nasaID={this.props.location.state.data.data[0].nasa_id}
                            />
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default DetailedInfo;
