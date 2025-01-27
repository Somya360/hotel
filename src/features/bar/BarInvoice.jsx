import React, { useCallback, useMemo, useState, memo } from "react";
// import LoadingComponent from "../../components/LoadingComponent";
// import SnackAlert from "../../components/Alert";
import {
  Box,
  Button,
  Divider,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import moment from "moment";

// const getCellValue = (obj, key, fallback = "") => {
//   if (!key) return undefined;
//   return key
//     .split(".")
//     .reduce(
//       (acc, part) => (acc && acc[part] !== undefined ? acc[part] : fallback),
//       obj
//     );
// };

const BarInvoice = () => {
  const barListTableHeaders = useMemo(
    () => [
      { label: "Sl. No.", key: "sno" },
      { label: "Item Name", key: "itemName" },
      { label: "Quantity", key: "quantity" },
    ],
    []
  );
  const { bookingRefNo } = useParams("bookingRefNo");
  const [isPrinting, setIsPrinting] = useState(false);
  // const [snack, setSnack] = useState({
  //   open: false,
  //   message: "",
  //   severity: "",
  // });

  const invoiceData = useMemo(() => {
    const sessionedEventData = sessionStorage.getItem(
      `barBillInvoice-${bookingRefNo}`
    );
    return sessionedEventData ? JSON.parse(sessionedEventData) : null;
  }, [bookingRefNo]);

  console.log("invoiceData", invoiceData);
  const totalBarExpense = useMemo(() => {
    const sum =
      invoiceData?.bookingDto?.barOrderDtos?.reduce(
        (sum, item) => sum + item?.totalAmount,
        0
      ) || 0;
    return sum.toFixed(2);
  }, [invoiceData]);

  const subTotalBarExpense = useMemo(() => {
    const sum =
      invoiceData?.bookingDto?.barOrderDtos?.reduce(
        (sum, item) => sum + (item?.totalAmount + item?.gstPrice),
        0
      ) || 0;
    return sum.toFixed(2);
  }, [invoiceData]);
  // const barListTableHeaders = useMemo(
  //   () => [
  //     { label: "Sl. No.", key: "sno" },
  //     { label: "Item", key: "itemName" },
  //     { label: "Quantity", key: "totalQuantity" },
  //   ],
  //   []
  // );

  const handlePrint = useCallback(() => {
    setIsPrinting(true);
    setTimeout(() => {
      window.print();
      setIsPrinting(false);
    }, 0);
  }, []);
  const hotelLogo = JSON.parse(sessionStorage.getItem("data")).hotelLogoUrl;

  return (
    <>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: 1,
          px: {
            xs: "50px",
            xl: "400px",
            md: "100px",
          },
        }}
      >
        <Box
          sx={{
            width: "100%",
            overflowX: "hidden",
            overflowY: "auto",
          }}
        >
          <Grid container size={12}>
            <Grid size={{ xs: 12 }}>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  py: 2,
                  px: 2,
                }}
              >
                <Box
                  component="img"
                  src={hotelLogo}
                  sx={{ width: 120, height: 120 }}
                />{" "}
                <Box>
                  <Typography
                    sx={{
                      fontWeight: "bold",
                      fontSize: "1.3rem",
                      textAlign: "right",
                    }}
                  >
                    {/* {invoiceData?.bookingDto?.hotel?.name} */}
                  </Typography>
                  <Typography
                    sx={{
                      fontWeight: "bold",
                      fontSize: "1rem",
                      textAlign: "right",
                    }}
                  >
                    {invoiceData?.bookingDto?.hotel?.address}
                    {", "}
                    {invoiceData?.bookingDto?.hotel?.state?.name}{" "}
                  </Typography>
                  <Typography
                    sx={{
                      fontWeight: "bold",
                      fontSize: "1rem",
                      textAlign: "right",
                    }}
                  >
                    {" "}
                    {invoiceData?.bookingDto?.hotel?.gstIn}
                  </Typography>
                  <Typography
                    sx={{
                      fontWeight: "bold",
                      fontSize: "1rem",
                      textAlign: "right",
                    }}
                  >
                    {" "}
                    {invoiceData?.bookingDto?.hotel?.email}
                  </Typography>
                  <Typography
                    sx={{
                      fontWeight: "bold",
                      fontSize: "1rem",
                      textAlign: "right",
                    }}
                  >
                    {invoiceData?.bookingDto?.hotel?.contactNos?.length &&
                      invoiceData?.bookingDto?.hotel?.contactNos?.join(", ")}
                  </Typography>
                </Box>
              </Box>

              <Typography
                sx={{
                  width: "100%",
                  textAlign: "center",
                  fontSize: "17px",
                  fontWeight: 600,
                  textDecoration: "underline",
                }}
              >
                Bar Invoice
              </Typography>

              <Grid container size={12}>
                {/* name */}
                <Grid size={2}>
                  <Typography
                    sx={{
                      fontSize: "15.5px",
                      // color: "#707070",
                      fontWeight: 600,
                    }}
                  >
                    Name
                  </Typography>
                </Grid>
                <Grid size={4}>
                  <Typography
                    sx={{
                      fontSize: "15.5px",
                      // color: "#707070",
                      fontWeight: 600,
                    }}
                  >
                    <Typography
                      component="span"
                      sx={{
                        fontSize: "15.5px",
                        // color: "#707070",
                        fontWeight: 600,
                        marginRight: "5px",
                      }}
                    >
                      :
                    </Typography>
                    <Typography
                      component="span"
                      sx={{
                        fontSize: "15.5px",
                        // color: "#707070",
                        // fontWeight: 600,
                      }}
                    >
                      {Boolean(invoiceData?.bookingDto?.firstName) &&
                        `${invoiceData?.bookingDto?.firstName}`}
                      {Boolean(invoiceData?.bookingDto?.middleName) &&
                        ` ${invoiceData?.bookingDto?.middleName}`}
                      {Boolean(invoiceData?.bookingDto?.lastName) &&
                        ` ${invoiceData?.bookingDto?.lastName}`}{" "}
                    </Typography>
                  </Typography>
                </Grid>

                {/* date */}
                <Grid size={2}>
                  <Typography
                    sx={{
                      fontSize: "15.5px",
                      // color: "#707070",
                      fontWeight: 600,
                    }}
                  >
                    Invoice Date
                  </Typography>
                </Grid>
                <Grid size={4}>
                  <Typography
                    sx={{
                      fontSize: "15.5px",
                      // color: "#707070",
                      fontWeight: 600,
                    }}
                  >
                    <Typography
                      component="span"
                      sx={{
                        fontSize: "15.5px",
                        // color: "#707070",
                        fontWeight: 600,
                        marginRight: "5px",
                      }}
                    >
                      :
                    </Typography>
                    <Typography
                      component="span"
                      sx={{
                        fontSize: "15.5px",
                        // color: "#707070",
                        // fontWeight: 600,
                      }}
                    >
                      {/* {invoiceData?.bookingDto?.checkOutDate} */}
                      {dayjs().format("DD-MM-YYYY")}
                    </Typography>
                  </Typography>
                </Grid>

                {/* address */}
                <Grid size={2}>
                  <Typography
                    sx={{
                      fontSize: "15.5px",
                      // color: "#707070",
                      fontWeight: 600,
                    }}
                  >
                    Address
                  </Typography>
                </Grid>
                <Grid size={4}>
                  <Typography
                    sx={{
                      fontSize: "15.5px",
                      // color: "#707070",
                      fontWeight: 600,
                    }}
                  >
                    <Typography
                      component="span"
                      sx={{
                        fontSize: "15.5px",
                        // color: "#707070",
                        fontWeight: 600,
                        marginRight: "5px",
                      }}
                    >
                      :
                    </Typography>
                    <Typography
                      component="span"
                      sx={{
                        fontSize: "15.5px",
                        // color: "#707070",
                        // fontWeight: 600,
                      }}
                    >
                      {invoiceData?.bookingDto?.address}
                    </Typography>
                  </Typography>
                </Grid>
                {/* booking ref no */}
                <Grid size={2}>
                  <Typography
                    sx={{
                      fontSize: "15.5px",
                      // color: "#707070",
                      fontWeight: 600,
                    }}
                  >
                    Booking No.
                  </Typography>
                </Grid>
                <Grid size={4}>
                  <Typography
                    sx={{
                      fontSize: "15.5px",
                      // color: "#707070",
                      fontWeight: 600,
                    }}
                  >
                    <Typography
                      component="span"
                      sx={{
                        fontSize: "15.5px",
                        // color: "#707070",
                        fontWeight: 600,
                        marginRight: "5px",
                      }}
                    >
                      :
                    </Typography>
                    <Typography
                      component="span"
                      sx={{
                        fontSize: "15.5px",
                        // color: "#707070",
                        // fontWeight: 600,
                      }}
                    >
                      {invoiceData?.bookingDto?.bookingRefNumber}
                    </Typography>
                  </Typography>
                </Grid>

                {/* email id */}
                <Grid size={2}>
                  <Typography
                    sx={{
                      fontSize: "15.5px",
                      // color: "#707070",
                      fontWeight: 600,
                    }}
                  >
                    Email ID
                  </Typography>
                </Grid>
                <Grid size={4}>
                  <Typography
                    sx={{
                      fontSize: "15.5px",
                      // color: "#707070",
                      fontWeight: 600,
                    }}
                  >
                    <Typography
                      component="span"
                      sx={{
                        fontSize: "15.5px",
                        // color: "#707070",
                        fontWeight: 600,
                        marginRight: "5px",
                      }}
                    >
                      :
                    </Typography>
                    <Typography
                      component="span"
                      sx={{
                        fontSize: "15.5px",
                        // color: "#707070",
                        // fontWeight: 600,
                      }}
                    >
                      {invoiceData?.bookingDto?.email || "NA"}
                    </Typography>
                  </Typography>
                </Grid>
                {/* booking date and time */}
                <Grid size={2}>
                  <Typography
                    sx={{
                      fontSize: "15.5px",
                      // color: "#707070",
                      fontWeight: 600,
                    }}
                  >
                    Booking Date
                  </Typography>
                </Grid>
                <Grid size={4}>
                  <Typography
                    sx={{
                      fontSize: "15.5px",
                      // color: "#707070",
                      fontWeight: 600,
                    }}
                  >
                    <Typography
                      component="span"
                      sx={{
                        fontSize: "15.5px",
                        // color: "#707070",
                        fontWeight: 600,
                        marginRight: "5px",
                      }}
                    >
                      :
                    </Typography>
                    <Typography
                      component="span"
                      sx={{
                        fontSize: "15.5px",
                        // color: "#707070",
                        // fontWeight: 600,
                      }}
                    >
                      {/* {invoiceData?.bookingDto?.bookedOn || "NA"} */}
                      {moment(invoiceData?.bookingDto?.bookedOn).format(
                        "DD-MM-YYYY hh:mm A"
                      )}
                    </Typography>
                  </Typography>
                </Grid>

                {/* phone nos */}
                <Grid size={2}>
                  <Typography
                    sx={{
                      fontSize: "15.5px",
                      // color: "#707070",
                      fontWeight: 600,
                    }}
                  >
                    Phone No
                  </Typography>
                </Grid>
                <Grid size={4}>
                  <Typography
                    sx={{
                      fontSize: "15.5px",
                      // color: "#707070",
                      fontWeight: 600,
                    }}
                  >
                    <Typography
                      component="span"
                      sx={{
                        fontSize: "15.5px",
                        // color: "#707070",
                        fontWeight: 600,
                        marginRight: "5px",
                      }}
                    >
                      :
                    </Typography>
                    <Typography
                      component="span"
                      sx={{
                        fontSize: "15.5px",
                        // color: "#707070",
                        // fontWeight: 600,
                      }}
                    >
                      {invoiceData?.bookingDto?.phoneNumber}
                    </Typography>
                  </Typography>
                </Grid>

                {/* Room category */}
                <Grid size={2}>
                  <Typography
                    sx={{
                      fontSize: "15.5px",
                      // color: "#707070",
                      fontWeight: 600,
                    }}
                  >
                    Room category{" "}
                  </Typography>
                </Grid>
                <Grid size={4}>
                  <Typography
                    sx={{
                      fontSize: "15.5px",
                      // color: "#707070",
                      fontWeight: 600,
                    }}
                  >
                    <Typography
                      component="span"
                      sx={{
                        fontSize: "15.5px",
                        // color: "#707070",
                        fontWeight: 600,
                        marginRight: "5px",
                      }}
                    >
                      :
                    </Typography>
                    <Typography
                      component="span"
                      sx={{
                        fontSize: "15.5px",
                        // color: "#707070",
                        // fontWeight: 600,
                      }}
                    >
                      {invoiceData?.roomType?.type}
                    </Typography>
                  </Typography>
                </Grid>

                {/*Company Name{" "}
                 */}
                <Grid size={2}>
                  <Typography
                    sx={{
                      fontSize: "15.5px",
                      // color: "#707070",
                      fontWeight: 600,
                    }}
                  >
                    Company Name{" "}
                  </Typography>
                </Grid>
                <Grid size={4}>
                  <Typography
                    sx={{
                      fontSize: "15.5px",
                      // color: "#707070",
                      fontWeight: 600,
                    }}
                  >
                    <Typography
                      component="span"
                      sx={{
                        fontSize: "15.5px",
                        // color: "#707070",
                        fontWeight: 600,
                        marginRight: "5px",
                      }}
                    >
                      :
                    </Typography>
                    <Typography
                      component="span"
                      sx={{
                        fontSize: "15.5px",
                        // color: "#707070",
                        // fontWeight: 600,
                      }}
                    >
                      {/* {invoiceData?.roomType?.type} */}
                      {JSON.parse(sessionStorage.getItem("data")).companyName}
                    </Typography>
                  </Typography>
                </Grid>

                {/* PAX */}
                <Grid size={2}>
                  <Typography
                    sx={{
                      fontSize: "15.5px",
                      // color: "#707070",
                      fontWeight: 600,
                    }}
                  >
                    Pax
                  </Typography>
                </Grid>
                <Grid size={4}>
                  <Typography
                    sx={{
                      fontSize: "15.5px",
                      // color: "#707070",
                      fontWeight: 600,
                    }}
                  >
                    <Typography
                      component="span"
                      sx={{
                        fontSize: "15.5px",
                        // color: "#707070",
                        fontWeight: 600,
                        marginRight: "5px",
                      }}
                    >
                      :
                    </Typography>
                    <Typography
                      component="span"
                      sx={{
                        fontSize: "15.5px",
                        // color: "#707070",
                        // fontWeight: 600,
                      }}
                    >
                      {invoiceData?.bookingDto?.bookingMapData?.length}
                    </Typography>
                  </Typography>
                </Grid>

                {/* gst no. */}
                <Grid size={2}>
                  <Typography
                    sx={{
                      fontSize: "15.5px",
                      // color: "#707070",
                      fontWeight: 600,
                    }}
                  >
                    GST Number
                  </Typography>
                </Grid>
                <Grid size={4}>
                  <Typography
                    sx={{
                      fontSize: "15.5px",
                      // color: "#707070",
                      fontWeight: 600,
                    }}
                  >
                    <Typography
                      component="span"
                      sx={{
                        fontSize: "15.5px",
                        // color: "#707070",
                        fontWeight: 600,
                        marginRight: "5px",
                      }}
                    >
                      :
                    </Typography>
                    <Typography
                      component="span"
                      sx={{
                        fontSize: "15.5px",
                        // color: "#707070",
                        // fontWeight: 600,
                      }}
                    >
                      {/* {invoiceData?.roomType?.type} */}
                      --
                    </Typography>
                  </Typography>
                </Grid>

                {/* GSTN Bill */}
                <Grid size={2}>
                  <Typography
                    sx={{
                      fontSize: "15.5px",
                      // color: "#707070",
                      fontWeight: 600,
                    }}
                  >
                    GSTN Bill
                  </Typography>
                </Grid>
                <Grid size={4}>
                  <Typography
                    sx={{
                      fontSize: "15.5px",
                      // color: "#707070",
                      fontWeight: 600,
                    }}
                  >
                    <Typography
                      component="span"
                      sx={{
                        fontSize: "15.5px",
                        // color: "#707070",
                        fontWeight: 600,
                        marginRight: "5px",
                      }}
                    >
                      :
                    </Typography>
                    <Typography
                      component="span"
                      sx={{
                        fontSize: "15.5px",
                        // color: "#707070",
                        // fontWeight: 600,
                      }}
                    >
                      {/* {invoiceData?.roomType?.type} */}
                      --
                    </Typography>
                  </Typography>
                </Grid>
                {/* arrival date and time */}
                <Grid size={2}>
                  <Typography
                    sx={{
                      fontSize: "15.5px",
                      // color: "#707070",
                      fontWeight: 600,
                    }}
                  >
                    Arrival
                  </Typography>
                </Grid>
                <Grid size={4}>
                  <Typography
                    sx={{
                      fontSize: "15.5px",
                      // color: "#707070",
                      fontWeight: 600,
                    }}
                  >
                    <Typography
                      component="span"
                      sx={{
                        fontSize: "15.5px",
                        // color: "#707070",
                        fontWeight: 600,
                        marginRight: "5px",
                      }}
                    >
                      :
                    </Typography>
                    <Typography
                      component="span"
                      sx={{
                        fontSize: "15.5px",
                        // color: "#707070",
                        // fontWeight: 600,
                      }}
                    >
                      {invoiceData?.bookingDto?.checkInDate || "NA"}
                    </Typography>
                  </Typography>
                </Grid>

                <Grid size={2}>
                  <Typography
                    sx={{
                      fontSize: "15.5px",
                      // color: "#707070",
                      fontWeight: 600,
                    }}
                  >
                    Room No.
                  </Typography>
                </Grid>
                <Grid size={4}>
                  <Typography
                    sx={{
                      fontSize: "15.5px",
                      // color: "#707070",
                      fontWeight: 600,
                    }}
                  >
                    <Typography
                      component="span"
                      sx={{
                        fontSize: "15.5px",
                        // color: "#707070",
                        fontWeight: 600,
                        marginRight: "5px",
                      }}
                    >
                      :
                    </Typography>
                    <Typography
                      component="span"
                      sx={{
                        fontSize: "15.5px",
                        // color: "#707070",
                        // fontWeight: 600,
                      }}
                    >
                      {invoiceData?.roomNo || "NA"}
                    </Typography>
                  </Typography>
                </Grid>
                <Grid size={2}>
                  <Typography
                    sx={{
                      fontSize: "15.5px",
                      // color: "#707070",
                      fontWeight: 600,
                    }}
                  >
                    Departure
                  </Typography>
                </Grid>
                <Grid size={4}>
                  <Typography
                    sx={{
                      fontSize: "15.5px",
                      // color: "#707070",
                      fontWeight: 600,
                    }}
                  >
                    <Typography
                      component="span"
                      sx={{
                        fontSize: "15.5px",
                        // color: "#707070",
                        fontWeight: 600,
                        marginRight: "5px",
                      }}
                    >
                      :
                    </Typography>
                    <Typography
                      component="span"
                      sx={{
                        fontSize: "15.5px",
                        // color: "#707070",
                        // fontWeight: 600,
                      }}
                    >
                      {invoiceData?.bookingDto?.checkOutDate || "NA"}
                    </Typography>
                  </Typography>
                </Grid>
                <Grid size={2}>
                  <Typography
                    sx={{
                      fontSize: "15.5px",
                      // color: "#707070",
                      fontWeight: 600,
                    }}
                  >
                    Billing Type
                  </Typography>
                </Grid>
                <Grid size={4}>
                  <Typography
                    sx={{
                      fontSize: "15.5px",
                      // color: "#707070",
                      fontWeight: 600,
                    }}
                  >
                    <Typography
                      component="span"
                      sx={{
                        fontSize: "15.5px",
                        // color: "#707070",
                        fontWeight: 600,
                        marginRight: "5px",
                      }}
                    >
                      :
                    </Typography>
                    <Typography
                      component="span"
                      sx={{
                        fontSize: "15.5px",
                        // color: "#707070",
                        // fontWeight: 600,
                      }}
                    >
                      {/* {invoiceData?.bookingDto?.checkOutDate || "NA"} */}
                      Direct Payment
                    </Typography>
                  </Typography>
                </Grid>
              </Grid>

              <Divider
                sx={{
                  borderBottomWidth: 2,
                  backgroundColor: "black",
                  my: 0.5,
                }}
              />

              <Grid
                container
                size={12}
                spacing={1}
                sx={{
                  gridTemplateColumns: {
                    xs: "2fr",
                  },
                  gridAutoFlow: "dense",
                  width: "100%",
                }}
              >
                {Boolean(invoiceData?.bookingDto?.barOrderDtos?.length) && (
                  <Grid size={12}>
                    {Boolean(invoiceData?.bookingDto?.barOrderDtos?.length) && (
                      <Box sx={{ width: "100%" }}>
                        <Typography
                          sx={{
                            fontSize: "18px",
                            fontWeight: 600,
                            width: "100%",
                            borderBottom: "2px solid #ccc",
                            marginBottom: "5px",
                          }}
                        >
                          Bar Details :
                        </Typography>
                        <Box sx={{ mb: 1 }}>
                          <CustomBarListTableContainerForInvoice
                            barListTableHeaders={barListTableHeaders}
                            barListTableData={
                              invoiceData?.bookingDto?.barOrderDtos
                            }
                            isForCheckOut={true}
                            // uniqueFoodItems={uniqueFoodItems}
                          />
                        </Box>
                      </Box>
                    )}
                  </Grid>
                )}
              </Grid>
              <Grid container size={12} columnSpacing={2}>
                <Grid size={12}>
                  <Box
                    sx={{
                      width: "99.7%",
                      margin: "auto",
                    }}
                  >
                    <Grid container size={12}>
                      <Grid size={6}>
                        <Box
                          sx={{
                            width: "100%",
                            height: "30px",
                            border: "1.3px solid black",
                            borderTop: "1.7px solid black",
                            borderLeft: "1.7px solid black",
                            bgcolor: "white",
                            paddingLeft: "5px",
                          }}
                        >
                          <Typography sx={{ fontWeight: 550 }}>
                            Bar Charges
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid size={6}>
                        <Box
                          sx={{
                            width: "100%",
                            height: "30px",
                            border: "1.3px solid black",
                            borderTop: "1.7px solid black",
                            borderRight: "1.7px solid black",
                            bgcolor: "white",
                          }}
                        >
                          <Typography
                            sx={{ textAlign: "right", fontWeight: 550 }}
                          >
                            {totalBarExpense}
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid size={6}>
                        <Box
                          sx={{
                            width: "100%",
                            height: "30px",
                            border: "1.3px solid black",
                            borderTop: "1.7px solid black",
                            borderLeft: "1.7px solid black",
                            bgcolor: "white",
                            paddingLeft: "5px",
                          }}
                        >
                          <Typography sx={{ fontWeight: 550 }}>
                            GST Charges{" "}
                            <span
                              style={{
                                color: "gray",
                                fontStyle: "italic",
                                fontSize: "0.9rem",
                              }}
                            >
                              (18%)
                            </span>
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid size={6}>
                        <Box
                          sx={{
                            width: "100%",
                            height: "30px",
                            border: "1.3px solid black",
                            borderTop: "1.7px solid black",
                            borderRight: "1.7px solid black",
                            bgcolor: "white",
                          }}
                        >
                          <Typography
                            sx={{ textAlign: "right", fontWeight: 550 }}
                          >
                            {totalBarExpense * 0.18}
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid size={6}>
                        <Box
                          sx={{
                            width: "100%",
                            height: "30px",
                            border: "1.3px solid black",
                            borderTop: "1.7px solid black",
                            borderLeft: "1.7px solid black",
                            bgcolor: "white",
                            paddingLeft: "5px",
                          }}
                        >
                          <Typography sx={{ fontWeight: 550 }}>
                            SubTotal
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid size={6}>
                        <Box
                          sx={{
                            width: "100%",
                            height: "30px",
                            border: "1.3px solid black",
                            borderTop: "1.7px solid black",
                            borderRight: "1.7px solid black",
                            bgcolor: "white",
                          }}
                        >
                          <Typography
                            sx={{ textAlign: "right", fontWeight: 550 }}
                          >
                            {subTotalBarExpense}
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>

                <Grid size={12}>
                  <Box
                    sx={{
                      display: "flex",
                      width: "100%",
                      justifyContent: "space-between",
                      // paddingX: 3,
                      gap: 3,
                      // marginTop: 4,
                    }}
                  >
                    <Box
                      sx={{
                        width: "300px",
                        height: "70px",
                        marginTop: "7px",
                      }}
                    >
                      <Typography>Remarks:</Typography>
                      <Box
                        sx={{
                          minHeight: "calc(100% - 25px)",
                          border: "2px solid black",
                          borderRadius: "5px",
                          bgcolor: "white",
                        }}
                      />
                    </Box>

                    <Box
                      sx={{
                        display: "flex",
                        flexGrow: 1,
                        justifyContent: "flex-end",
                        columnGap: 1.5,
                      }}
                    >
                      <Box
                        sx={{
                          height: "125px",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Box
                          sx={{
                            minHeight: "45px",
                            border: "2px solid black",
                            borderRadius: "5px",
                            bgcolor: "white",
                            width: "170px",
                          }}
                        />
                        <Typography sx={{ fontSize: "14px" }}>
                          Staff Signature
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          height: "125px",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Box
                          sx={{
                            minHeight: "45px",
                            border: "2px solid black",
                            borderRadius: "5px",
                            bgcolor: "white",
                            width: "170px",
                          }}
                        />
                        <Typography sx={{ fontSize: "14px" }}>
                          Guest Signature
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
        {!isPrinting && (
          <Box
            sx={{
              width: "100%",
              // position: "fixed",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              bottom: 15,
              zIndex: 100,
              // backgroundColor: "yellow",
            }}
          >
            <Button
              variant="contained"
              size="small"
              onClick={() => handlePrint()}
              sx={{
                backgroundImage:
                  "linear-gradient(to right, #0acffe 0%, #495aff 100%)",
                color: "white",
                "&:hover": {
                  backgroundImage:
                    "linear-gradient(to right, #0acffe 10%, #495aff 90%)",
                },
                // ml: 60,
              }}
            >
              PRINT NOW
            </Button>
          </Box>
        )}
      </Box>
    </>
  );
};

const CustomBarListTableContainerForInvoice = memo(function ({
  barListTableHeaders,
  barListTableData,
}) {
  return (
    <React.Fragment>
      <TableContainer
        component={Paper}
        sx={{
          overflow: "auto",
          // maxHeight: { xs: isForCheckOut ? "220px" : "310px" },
          // xl: "calc(100vh - 280px)",
          "&::-webkit-scrollbar": {
            // height: "14px",
          },
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
        }}
      >
        <Table aria-label="simple table" stickyHeader size="small">
          <TableHead>
            <TableRow>
              {barListTableHeaders?.map((item, index) => {
                return (
                  <TableCell
                    key={`room-table-head-${index}`}
                    align="center"
                    sx={{
                      backgroundColor: "#dbd8ff",
                      fontWeight: "bold",
                      // paddingY: "10px",
                      fontSize: "13px",
                    }}
                  >
                    {item?.label}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>

          <TableBody>
            {barListTableData?.flatMap((row) =>
              // Use flatMap to flatten the nested arrays
              row.ordersList.map((orderItem, orderIndex) => (
                <CustomParentRowForBar
                  barListTableHeaders={barListTableHeaders}
                  rowSerialNumber={orderIndex + 1}
                  key={`${row.id}-${orderItem.id}`}
                  row={orderItem} // Pass orderItem as row
                />
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </React.Fragment>
  );
});

const CustomParentRowForBar = memo(function ({
  barListTableHeaders,
  rowSerialNumber,
  key,
  row,
}) {
  const getCellValue = (row, key) => {
    switch (key) {
      case "sno":
        return rowSerialNumber;
      case "itemName":
        return row?.item?.name || "-";
      case "quantity":
        return row?.noOfQty || "-";
      default:
        return "-";
    }
  };
  console.log("row", row);
  return (
    <TableRow
      hover
      key={row?.id}
      sx={{
        cursor: "pointer",
        height: 35,
        backgroundColor: "inherit",
        "&:hover": {
          backgroundColor: "inherit",
        },
      }}
    >
      {barListTableHeaders?.map((subitem, subIndex) => (
        <TableCell key={`table-body-cell-${subIndex}`} align="center">
          <Typography sx={{ fontSize: "12px", wordWrap: "break-word" }}>
            {getCellValue(row, subitem?.key)}
          </Typography>
        </TableCell>
      ))}
    </TableRow>
  );
});

export default BarInvoice;
