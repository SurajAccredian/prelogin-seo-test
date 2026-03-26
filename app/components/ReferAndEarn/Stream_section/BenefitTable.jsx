import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { tableCellClasses } from "@mui/material/TableCell";
import { Button, Pagination } from "@mui/material";
import "../refer.css";
import benefitOnReferral from "../../Assets/programs.json";
import { groupProgramsByCategory } from "../../../helpers/common.helpers";

// Table cells CSS
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#1A73E859",
    color: "#1350A0",
    fontWeight: "600",
    borderRight: "1px solid gray",
    borderBottom: 0,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    borderRight: "1px solid gray",
    borderBottom: 0,
  },
  "&:last-child": {
    borderRight: 0,
  },
}));

const BenefitTable = ({ selectedVertical, enrolled, columnNames }) => {
  //state for pagination
  const [currentPage, setCurrentPage] = useState(1);
  //maximum rows allowed per table
  const rowsPerPage = 8;

  //Custom style for paginaion tabs
  const customStyle = {
    '& .Mui-selected': {
      backgroundColor: '#1A73E8!important',
      color: 'white',
      '&:hover': {
        backgroundColor: '#1B66C9!important',
      }
    },
  };

  //Getting all the programs
  const programs = groupProgramsByCategory(benefitOnReferral);

  //Filtering the category of programs based on vertical
  const selectedCat = programs[selectedVertical] || [];

  //Paginate rows if more than rows per table
  const paginatedRows = selectedCat.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  //Function to handle page change
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <div className="gap-3 w-full h-full h-max">
      <div className="benefit-table rounded-xl mt-[-13px]">
        <TableContainer
          component={Paper}
          sx={{ borderRadius: "0.375rem", boxShadow: '0px 4px 29.3px 0px #3c3c3c26' }}
          className="my-4"
        >
          <Table
            sx={{ minWidth: 700, paddingY: "10px" }}
            aria-label="customized table"
          >
            <TableHead>
              <TableRow>
                {columnNames.map((column, index) => (
                  <StyledTableCell
                    key={index}
                    sx={{ fontFamily: 'circular' }}
                    align={column === "Programs" ? "left" : "center"}
                  >
                    {column}
                  </StyledTableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedRows.map((row, rowIndex) => (
                <TableRow key={rowIndex}>
                  <StyledTableCell
                    sx={{
                      maxWidth: "150px",
                      overflow: "hidden",
                      wordBreak: "break-word",
                      "@media (max-width: 600px)": {
                        maxWidth: "150px",
                      },
                      "@media (min-width: 601px)": {
                        maxWidth: "300px",
                      },
                      fontFamily: 'circular',
                    }}
                  >
                    <span className="flex gap-4 items-start">
                      <img src="https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/other/program-hat.svg" alt="program" />
                      {row.program_name}
                    </span>
                  </StyledTableCell>
                  <StyledTableCell align="center" sx={{ fontFamily: 'circular' }}>
                    {enrolled
                      ? row.enrolled.referrerBonus
                      : row.notEnrolled.referrerBonus}
                  </StyledTableCell>
                  <StyledTableCell align="center" sx={{ fontFamily: 'circular' }}>
                    {enrolled
                      ? row.enrolled.refreeBonus
                      : row.notEnrolled.refreeBonus}
                  </StyledTableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      {/* if rows are greater than row per table then show pagination tabs */}
      {selectedCat.length > rowsPerPage && (
        <div className="pagination w-full flex justify-end">
          <Pagination
            shape="rounded"
            count={Math.ceil(selectedCat.length / rowsPerPage)}
            page={currentPage}
            onChange={handlePageChange}
            // color="primary"
            sx={customStyle}
          />
        </div>
      )}
    </div>
  );
};

export default BenefitTable;
