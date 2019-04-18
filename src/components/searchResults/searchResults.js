import React from "react";

// Component to display search results in a user friendly way
// API data is passed as props.itemsList
class SearchResults extends React.Component {
  render() {
    return (
      <>
        {this.props.itemsList.map(item => (
          <div className="row ">
            <div className="col-sm-2" />
            <div className="col-sm-8 listItem">
              <div className="dataHolder">
                <h2 className="dataHolderTitle text-center">
                  {item.data[0].title}
                </h2>
                <img
                  align="center"
                  className="NASAImage"
                  src={"" + item.links[0].href.toString()}
                />
                <br /> <br />
                <div className="itemInfo">
                  <h6 className="listItemHeading">
                    NASA ID&nbsp;&nbsp;
                    <p className="listItemParagraph">
                      <em>{item.data[0].nasa_id.toUpperCase()}</em>
                    </p>
                  </h6>
                  <p className="listItemParagraph">
                    <strong>Center:&nbsp;&nbsp;</strong>
                    {item.data[0].center}
                  </p>
                  <p className="listItemParagraph">
                    <strong>Date Created:&nbsp;&nbsp;</strong>
                    {item.data[0].date_created}
                  </p>
                  <p className="listItemParagraph">
                    <strong>Description:&nbsp;&nbsp;</strong>
                    {item.data[0].description.trim()}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-sm-2" />
          </div>
        ))}
        ;
      </>
    );
  }
}

export default SearchResults;
