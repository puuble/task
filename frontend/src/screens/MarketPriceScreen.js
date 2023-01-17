import React, { useEffect } from "react";
import { listPositions } from "../actions/currencyActions";
import { useDispatch, useSelector } from "react-redux";
import { Table } from "react-bootstrap";

import Loader from "../components/Loader";
import Message from "../components/Message";

function MarketPriceScreen() {
  const dispatch = useDispatch();
  const positionList = useSelector((state) => state.positionList);
  const { success, loading, error, positions } = positionList;

  useEffect(() => {
    dispatch(listPositions());
  }, [dispatch, success]);

  return (
    <div>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <h1>Summary</h1>
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>PAIR</th>
                <th>ENTRY PRICE</th>
                <th>EXIT PRICE</th>
                <th>QTY</th>
                <th>POSITION</th>
                <th>PNLUSDT</th>
                <th>PNLPERCENT</th>
                <th>PROFIT</th>
              </tr>
            </thead>

            <tbody>
              {positions.map((item) => (
                <tr key={item.id}>
                  <td>{item.pair}</td>
                  <td>{item.entryPrice}</td>
                  <td>{item.exitPrice}</td>
                  <td>{item.qty}</td>
                  <td>{item.position}</td>
                  <td>{item.pnlusdt}</td>
                  <td>{item.pnlpercent}</td>
                  <td>
                    {item.profit === null ? (
                      <p>Waiting</p>
                    ) : item.profit === true ? (
                      <p>True</p>
                    ) : (
                      <p>False</p>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </div>
  );
}

export default MarketPriceScreen;
