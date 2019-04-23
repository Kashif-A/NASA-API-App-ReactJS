import React from "react";
import "../itemLinks/itemLinks.css";

let keyID = 0;
// Component to show the links found within the /assets/{nasa_id} endpoint
class ItemLinks extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hrefs: []
        };
    }

    shouldComponentUpdate() {
        if (!this.state.hrefs.length) {
            return true;
        } else {
            return false;
        }
    }

    // Get asset data from /assets/{nasa_id} endpoint
    getAssetData() {
        fetch("https://images-api.nasa.gov/asset/" + this.props.nasaID)
            .then(res => res.json())
            .then(
                result => {
                    this.setState({ hrefs: result.collection.items });
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                error => {
                    console.log(error);
                    alert("Something went wrong. Please try again!");
                }
            );
    }

    render() {
        this.getAssetData();

        return (
            <>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 text-center">
                            <h3>
                                Extra assets from /asset/{"{"}nasa_id{"}"} endpoint
              </h3>
                            <hr />
                        </div>
                        <div className="col-md-2" />
                        <div className="col-md-8">
                            {this.state.hrefs.map(item => (
                                <p className="linksToAssets">{item.href}</p>
                            ))}
                            <div className="col-md-2" />
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default ItemLinks;
