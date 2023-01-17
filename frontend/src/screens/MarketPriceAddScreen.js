import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col, Table } from "react-bootstrap";
import useWebSocket from "react-use-websocket";
import { useDispatch, useSelector } from "react-redux";
import {
  createSymbol,
  updateSymbol,
  listSymbols,
  deleteSymbol,
} from "../actions/currencyActions";
import Loader from "../components/Loader";
import Message from "../components/Message";

function MarketPriceAddScreen() {
  const dispatch = useDispatch();
  const { lastJsonMessage } = useWebSocket(
    "wss://stream.binance.com:9443/stream?streams=!ticker@arr"
  );
  const symbolList = useSelector((state) => state.symbolList);
  const { success, loading, error, symbols } = symbolList;

  const symbolDelete = useSelector((state) => state.symbolDelete);
  const { success: successDelete } = symbolDelete;

  const symbolCreate = useSelector((state) => state.symbolCreate);
  const { success: successCreate } = symbolCreate;

  const symbolUpdate = useSelector((state) => state.symbolUpdate);
  const { success: successUpdate } = symbolUpdate;

  const [data, setData] = useState([]);
  const [pair, setPair] = useState("");
  const [marketSymbol, setMarketSymbol] = useState("");

  const buttonHandler = (position, marketSymbol) => {
    dispatch(updateSymbol({ position, market_symbol: marketSymbol }));
  };

  useEffect(() => {
    dispatch(listSymbols());
  }, [dispatch, success, successCreate, successDelete, successUpdate]);

  useEffect(() => {
    if (lastJsonMessage !== null) {
      setData(lastJsonMessage);
    }
  }, [lastJsonMessage]);

  const getDataFromMarketSymbol = (marketSymbol) => {
    const symbol = lastJsonMessage["data"].filter(
      (symbol) => symbol.s === marketSymbol
    );
    return symbol[0]["a"];
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createSymbol({ pair, market_symbol: marketSymbol }));
  };

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure")) {
      dispatch(deleteSymbol(id));
    }
  };

  return (
    <div>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          {" "}
          <h1>Add Currency</h1>
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : (
            <Form onSubmit={submitHandler}>
              <Row>
                <Col>
                  <Form.Group controlId="name">
                    <Form.Control
                      type="text"
                      placeholder="Pair"
                      value={pair}
                      onChange={(e) => setPair(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="name">
                    <Form.Control
                      type="text"
                      placeholder="Market Symbol"
                      value={marketSymbol}
                      onChange={(e) => setMarketSymbol(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                </Col>
                <Col>
                  <Button type="submit" variant="primary">
                    ADD
                  </Button>
                </Col>
              </Row>
            </Form>
          )}
          <br></br>
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>PAIR</th>
                <th>MARKET SYMBOL</th>
                <th>POSITION</th>
                <th>PRICE</th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {symbols.map((item) => (
                <tr key={item.id}>
                  <td>{item.pair}</td>
                  <td>{item.marketSymbol}</td>
                  <td>{item.position}</td>
                  <td>
                    {lastJsonMessage !== null ? (
                      getDataFromMarketSymbol(item.marketSymbol).slice(0, 10)
                    ) : (
                      <Loader />
                    )}
                  </td>
                  {item.position === null ? (
                    <>
                      <td>
                        <Button
                          onClick={() =>
                            buttonHandler("LONG", item.marketSymbol)
                          }
                          className="btn-sm"
                        >
                          LONG
                        </Button>
                      </td>
                      <td>
                        <Button
                          onClick={() =>
                            buttonHandler("SHORT", item.marketSymbol)
                          }
                          className="btn-sm"
                        >
                          SHORT
                        </Button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td>
                        <Button
                          onClick={() =>
                            buttonHandler("LONG", item.marketSymbol)
                          }
                          className="btn-sm"
                          disabled
                        >
                          LONG
                        </Button>
                      </td>
                      <td>
                        <Button
                          onClick={() =>
                            buttonHandler("SHORT", item.marketSymbol)
                          }
                          className="btn-sm"
                          disabled
                        >
                          SHORT
                        </Button>
                      </td>
                    </>
                  )}
                  <td>
                    {item.position === "LONG" || item.position === "SHORT" ? (
                      <Button
                        onClick={() =>
                          buttonHandler("CLOSE", item.marketSymbol)
                        }
                        className="btn-sm"
                      >
                        CLOSE
                      </Button>
                    ) : (
                      <Button className="btn-sm" disabled>
                        CLOSE
                      </Button>
                    )}
                  </td>
                  <td>
                    {" "}
                    <Button
                      className="btn-sm"
                      variant="danger"
                      onClick={() => deleteHandler(item.marketSymbol)}
                    >
                      DELETE
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
      <br />
    </div>
  );
}

export default MarketPriceAddScreen;
