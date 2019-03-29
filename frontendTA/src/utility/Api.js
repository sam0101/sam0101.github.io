import React from "react";

class Api extends React.Component {
  constructor(props, context) {
    super(props);
  }
  baseUrl = () => {
    var baseurl = "https://api.prontoitlabs.com/api/v1/user";
    return baseurl;
  };


}
export default new Api();
