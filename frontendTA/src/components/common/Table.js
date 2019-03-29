import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";

const RemotePagination = ({
  columns,
  data,
  page,
  sizePerPage,
  onTableChange,
  totalSize
}) => (
  <div>
    <BootstrapTable
      remote
      keyField="id"
      data={data}
      columns={columns}
      striped
      hover
      condensed
      pagination={paginationFactory({
        page,
        sizePerPage,
        totalSize,
        hideSizePerPage: true,
        hidePageListOnlyOnePage: true,
        alwaysShowAllBtns: true,
        firstPageText: "First",
        prePageText: "Back",
        nextPageText: "Next",
        lastPageText: "Last"
      })}
      onTableChange={onTableChange}
    />
  </div>
);
export default RemotePagination;
