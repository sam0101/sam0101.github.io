import React from "react";
import { Redirect } from "react-router-dom";
import Api from "../utility/Api";
import RemotePagination from "./common/Table";
import SweetAlert from 'react-bootstrap-sweetalert';

class UserList extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            page: 1,
            data: [],
            sizePerPage: 25,
            total: 0,
            redirect: false,
            showsuccess: false,
        };
        this.token = localStorage.getItem("token")
        this.UserList = this.UserList.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.logout = this.logout.bind(this);
        this.showMsg = this.showMsg.bind(this);
    }
    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }
    handleTableChange = (type, { page, sizePerPage }) => {
        this.UserList(page-1, sizePerPage);
    };
    UserList(page = 0, sizePerPage = 25) {
        fetch(Api.baseUrl() + "?page=" + page + "&size=" + sizePerPage, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "X-AUTH-TOKEN": this.token
            },
        })
            .then(response => response.json())
            .then(responseJson => {
                if (responseJson.data) {
                    this.setState({
                        total: responseJson.data.totalElements,
                        data: responseJson.data.content,
                        page: page,
                        sizePerPage: sizePerPage
                    })
                }
                else {
                    if (responseJson.errorMessage) {
                        if (responseJson.errorMessage === "Invalid Token!") {
                            localStorage.clear();
                        }
                        this.setState({
                            showsuccess: true,
                            title: responseJson.errorMessage,
                            alert_messege: "",
                            redirect: true
                        })
                    }
                }
            })
            .catch(error => {
                this.setState({ errors: true });
            });
    }
    componentDidMount() {
        if (!this.token) {
            this.setState({
                redirect: true
            })
        } else {

            this.UserList(0, 25);
        }
    }
    logout() {
        localStorage.clear();
        this.setState({
            redirect: true
        })
    }
    showMsg() {
        this.setState({
            showsuccess: false,
            modal: false
        })
    }
    render() {
        const { redirect } = this.state;
        if (redirect) {
            return <Redirect push to="/login" />;
        }
        const { data, sizePerPage, page, total } = this.state;
        const columns = [
            { dataField: "id", text: "ID" },
            { dataField: "userName", text: "UserName" },
            { dataField: "gender", text: "Gender" }
        ];
        return (


            <div className="wrapper wrapper-content animated fadeInRight">
                <div className="row row_wrapp1">

                    <div className="col-lg-10 m_auto tbl_head">
                        <div className="row">
                            <div className="col-4 all_center">
                                <h4>User Listing</h4>

                            </div>
                            <div className="col-4 all_center">

                                <h6>{"Total User :" + this.state.total}</h6>

                            </div>
                            <div className="col-4 all_center">

                                <button className="btn btn-success btn-sm" onClick={() => this.logout()} >Logout</button>
                            </div>
                        </div>
                    </div>
                </div>
                {this.state.total > 0 ? (
                    <div className="row">

                        <div className="col-lg-10 m_auto ">

                            <div className="ibox ">

                                <div className="ibox-content">

                                    <RemotePagination
                                        columns={columns}
                                        data={data}
                                        page={page+1}
                                        sizePerPage={sizePerPage}
                                        totalSize={total}
                                        onTableChange={this.handleTableChange}
                                    />

                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                        "No Record found"
                    )}
                <SweetAlert title={this.state.title ? this.state.title : ""} show={this.state.showsuccess} onConfirm={() => this.showMsg()}>
                    {this.state.alert_messege}
                </SweetAlert>
            </div>

        );
    }
}

export default UserList;
