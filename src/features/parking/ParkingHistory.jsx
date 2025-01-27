import React, { memo } from "react";

import {
  Box,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Paper,
  TableBody,
  Typography,
} from "@mui/material";
import { useGetAllParkingHistoryDataQuery } from "../../services/parking";

import Grid from "@mui/material/Grid2";
import moment from "moment";
// import LoadingComponent from "../../components/LoadingComponent";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function calculateSerialNumber(index, pageNumber, rowsPerPage) {
  index = index ?? 0;
  pageNumber = pageNumber ?? 0;
  rowsPerPage = rowsPerPage ?? 10;

  index = Number(index);
  pageNumber = Number(pageNumber);
  rowsPerPage = Number(rowsPerPage);

  return pageNumber * rowsPerPage + index + 1;
}

const getCellValue = (obj, key, fallback = "") => {
  if (!key) {
    // Return length of itemsDto array for Items column
    return obj.itemsDto ? obj.itemsDto.length : 0;
  }
  return key
    .split(".")
    .reduce(
      (acc, part) => (acc && acc[part] !== undefined ? acc[part] : fallback),
      obj
    );
};

const ParkingHistory = () => {
  const navigate = useNavigate();

  const ParkingeHistoryTableHeaders = React.useMemo(() => {
    return [
      { label: "Sl. No.", key: "sno" },
      { label: "Vehicle No.", key: "vehicleNo" },
      { label: "Parking Slot", key: "parkingSlot" },
      { label: "Vehicle Type", key: "vehicleType" },
      { label: "Parked Date", key: "parkedDate" },
      { label: "Release Date", key: "releasedDate" },
    ];
  }, []);

  const initialParkingHistoryTableFilters = React.useMemo(
    () => ({
      cleaningStatus: null,
      cleaningStatusInputVal: "",
      pageNo: 0,
      pageSize: 10,
    }),
    []
  );

  const [
    cleaningServiceHistoryTableFilters,
    //  setLaundryHistoryTableFilters
  ] = React.useState(initialParkingHistoryTableFilters);

  const [parkingHistoryTablePageNo, setParkingHistoryTablePageNo] =
    React.useState(0);
  const [parkingHistoryTableRowsPerPage, setParkingHistoryTableRowsPerPage] =
    React.useState(10);

  const handleChangeParkingHistoryTablePageNo = React.useCallback(
    (event, newpage) => {
      setParkingHistoryTablePageNo(newpage);
    },
    []
  );

  const handleChangeParkingHistoryTableRowsPerPage = React.useCallback(
    (event) => {
      setParkingHistoryTableRowsPerPage(parseInt(event.target.value, 10));
      setParkingHistoryTablePageNo(0);
    },
    []
  );

  const {
    data: parkingHistory = {
      paginationData: {
        numberOfElements: 0,
        totalElements: 0,
        totalPages: 0,
        data: [],
      },
    },
    // isLoading: isParkingHistoryLoading,
  } = useGetAllParkingHistoryDataQuery({
    hotelId: JSON.parse(sessionStorage.getItem("data"))?.hotelId,
    pageNo: cleaningServiceHistoryTableFilters?.pageNo,
    pageSize: cleaningServiceHistoryTableFilters?.pageSize,
  });

  console.log("hello", parkingHistory?.paginationData);
  return (
    <>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: 1,
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <FaArrowAltCircleLeft
              style={{
                color: "#164e80",
                marginRight: "5px",
                cursor: "pointer",
                fontSize: "20px",
              }}
              onClick={() => {
                navigate(-1);
              }}
            />
            <Typography
              variant="h5"
              display="inline-block"
              fontWeight="500"
              marginX="0"
            >
              Parking History
            </Typography>
          </Box>
        </Box>

        <Grid container size={12}>
          <Grid size={{ xs: 12 }}>
            <Box
              sx={{
                width: "100%",
                height: {
                  xs: "calc(100vh - 250px)",
                  xl: "calc(100vh - 200px)",
                },
                overflowX: "hidden",
                overflowY: "auto",
              }}
            >
              <CustomParkingHistoryTableContainer
                tableHeaders={ParkingeHistoryTableHeaders}
                tableData={parkingHistory?.paginationData}
                pageNo={parkingHistoryTablePageNo}
                pageSize={parkingHistoryTableRowsPerPage}
                handlePageChange={handleChangeParkingHistoryTablePageNo}
                handleChangeRowsPerPage={
                  handleChangeParkingHistoryTableRowsPerPage
                }
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

const CustomParkingHistoryTableContainer = memo(function ({
  tableHeaders,
  tableData,
  pageNo,
  pageSize,
  handlePageChange,
  handleChangeRowsPerPage,
}) {
  return (
    <>
      <TableContainer
        component={Paper}
        sx={{
          overflow: "auto",
          maxHeight: {
            xs: "calc(100vh - 310px)",
            xl: "calc(100vh - 280px)",
            "&::-webkit-scrollbar": {},
            "&::-webkit-scrollbar-track": {
              backgroundColor: "#ffffff00",
              width: "none",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#280071",
              borderRadius: "4px",
            },
            "&::-webkit-scrollbar-thumb:hover": {
              backgroundColor: "#3b0b92",
            },
          },
        }}
      >
        <Table aria-label="simple table" stickyHeader size="small">
          <TableHead>
            <TableRow>
              {tableHeaders?.map((item, index) => {
                return (
                  <TableCell
                    key={`table-head-${index}`}
                    align="center"
                    sx={{
                      color: "white",
                      backgroundColor: "primary.main",
                      fontWeight: "bold",
                      paddingY: item?.key === "sno" ? "15px" : "auto",

                      fontSize: "14px",
                    }}
                  >
                    {item?.label}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {Boolean(tableData?.data?.length > 0) ? (
              tableData?.data?.map((row, index) => (
                <CustomRow
                  tableHeaders={tableHeaders}
                  rowSerialNumber={calculateSerialNumber(
                    index,
                    pageNo,
                    pageSize
                  )}
                  key={row.id}
                  row={row}
                />
              ))
            ) : (
              <TableRow>
                <TableCell
                  align="center"
                  colSpan={
                    Boolean(tableHeaders?.length) ? tableHeaders?.length : 1
                  }
                >
                  No data available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={tableData?.totalElements || 0}
        rowsPerPage={pageSize}
        page={pageNo}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleChangeRowsPerPage}
        // rowsPerPageOptions={[5, 10, 20, 50, 100]}
      />
    </>
  );
});

const CustomRow = memo(function ({ tableHeaders, rowSerialNumber, row }) {
  console.log("rowwww", row);
  return (
    <>
      <TableRow
        hover
        key={row?.id}
        sx={{
          cursor: "pointer",
          height: 60,
          backgroundColor: "inherit",
          "&:hover": {
            backgroundColor: "inherit",
          },
        }}
      >
        {tableHeaders?.map((subitem, subIndex) => {
          return (
            <TableCell key={`table-body-cell=${subIndex}`} align="center">
              <Box>
                {subitem?.key === "sno" ? (
                  <Typography
                    sx={{
                      fontSize: "13px",
                      cursor: subitem?.key === "" ? "pointer" : "default",
                    }}
                  >
                    {rowSerialNumber}
                  </Typography>
                ) : subitem?.key === "vehicleNo" ? (
                  <Typography sx={{ fontSize: "13px" }}>
                    {row?.slotData &&
                      row?.slotData?.parkingVehicleData?.vehicleNo}
                  </Typography>
                ) : subitem?.key === "parkingSlot" ? (
                  <Typography sx={{ fontSize: "13px" }}>
                    {row?.slotData && row?.slotData?.areaDto?.areaName}
                  </Typography>
                ) : subitem?.key === "vehicleType" ? (
                  <Typography sx={{ fontSize: "13px" }}>
                    {row?.slotData && row?.slotData?.vehicleType}
                  </Typography>
                ) : subitem?.key === "parkedDate" ? (
                  <Typography sx={{ fontSize: "13px" }}>
                    {row?.slotData?.parkingVehicleData?.checkInDate &&
                      moment(
                        row?.slotData?.parkingVehicleData?.checkInDate
                      ).format("DD-MM-YYYY hh:mm A")}
                  </Typography>
                ) : subitem?.key === "releasedDate" ? (
                  <Typography sx={{ fontSize: "13px" }}>
                    {row?.slotData?.parkingVehicleData?.checkOutDate &&
                      moment(
                        row?.slotData?.parkingVehicleData?.checkOutDate
                      ).format("DD-MM-YYYY hh:mm A")}
                  </Typography>
                ) : (
                  <Typography sx={{ fontSize: "13px" }}>
                    {getCellValue(row, subitem?.key)}
                  </Typography>
                )}
              </Box>
            </TableCell>
          );
        })}
      </TableRow>
    </>
  );
});
export default ParkingHistory;
