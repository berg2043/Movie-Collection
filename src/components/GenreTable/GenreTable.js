import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { Table, TableHead, TableRow, TableBody, TableCell, Button } from '@material-ui/core';


const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: '#50514f',
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: '#cbd4c2',
    },
    '&:nth-of-type(even)': {
      backgroundColor: '#fffcff'
    }
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
  window: {
    width: 'max-content',
    margin: 'auto'
  },
  delete:{
  margin: "auto",
  marginTop: 0,
  backgroundColor: '#50514f',
  color: '#cbd4c2',
  }
});

function GenreTable(){
  const classes = useStyles();
  // Dispatch set up
  const dispatch = useDispatch();

  // Gets all the genres on load
  useEffect(()=>{
    dispatch({type: 'GET_GENRES'})
  }, [dispatch]);  

  // Gains access to genres reducer
  const genres = useSelector(state=>state.genreList) || [];

  return(
    <div className={classes.window}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <StyledTableCell>Project</StyledTableCell>
            <StyledTableCell>Total Movies</StyledTableCell>
            <StyledTableCell></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {genres.map(genre=>{
            return(
              <StyledTableRow  key={genre.id}>
                <StyledTableCell >{genre.project}</StyledTableCell >
                <StyledTableCell >{genre.count}</StyledTableCell >
                <StyledTableCell >
                  <Button
                    onClick={(event)=>{dispatch({type: 'DELETE_GENRE', payload: genre.id})}}
                    variant="contained"
                    color="secondary"
                    className={classes.delete}
                  >
                    Delete
                  </Button>
                </StyledTableCell >
              </StyledTableRow >
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

export default GenreTable;