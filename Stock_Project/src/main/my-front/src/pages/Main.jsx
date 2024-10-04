import React, { useState, useEffect } from 'react';
import Layout from '../components/layout';
import axios from 'axios';
import Channel from '../components/Channel'; // 채팅 컴포넌트 임포트

function Main() {
    const [gdpStocks, setGdpStocks] = useState([]);
    const [priceIncreaseStocks, setPriceIncreaseStocks] = useState([]);

    useEffect(() => {
        fetchStockList();
    }, []);

    const fetchStockList = () => {
        axios.get('http://localhost:8080/gdp')  // API 경로를 '/gdp'로 설정
            .then(response => {
                console.log("GDP 데이터:", response.data);  // 응답 데이터 확인
                setGdpStocks(response.data);
            })
            .catch(error => console.error('Error fetching stocks: ', error));
    };

    const fetchPriceIncreaseRate = (date) => {
        axios.get(`http://localhost:8080/priceIncreaseRate?date=${date}`)
            .then(response => {
                console.log("가격 상승률 데이터:", response.data);
                setPriceIncreaseStocks(response.data);
            })
            .catch(error => console.error('Error fetching price increase rate: ', error));
    };
    
    // 날짜를 지정하여 가격 상승률 데이터를 요청하는 예시
    useEffect(() => {
        const targetDate = '2024-09-05';  // 원하는 날짜를 입력
        console.log("Target date for API call:", targetDate);
        fetchPriceIncreaseRate(targetDate);
    }, []);
    
    return (
        <Layout>
            <h2>GDP 데이터</h2>
            <table border="1">
                <thead>
                    <tr>
                        <th>나라</th>
                        <th>금액</th>
                        <th>변화금액</th>
                        <th>퍼센트</th>
                    </tr>
                </thead>
                <tbody>
                {Array.isArray(gdpStocks) && gdpStocks.length > 0 ? (
                    gdpStocks.map(stock => (
                        <tr key={stock.나라}>
                            <td>{stock.나라}</td>
                            <td>{stock.금액}</td>
                            <td>{stock.변화금액}</td>
                            <td>{stock.퍼센트}</td>
                        </tr>
                    ))
                ) : (
                    <tr><td colSpan="4">GDP 데이터가 없습니다</td></tr>
                )}
                </tbody>
            </table>

            <h2>주식 랭킹(가격 상승률)</h2>
            <table border="1">
                <thead>
                    <tr>
                        <th>종목코드</th>
                        <th>종목명</th>
                        <th>종가</th>
                        <th>상승률</th>
                    </tr>
                </thead>
                <tbody>
                {Array.isArray(priceIncreaseStocks) && priceIncreaseStocks.length > 0 ? (
                    priceIncreaseStocks.map(stock => (
                        <tr key={stock[0]}>  {/* stock[0]은 종목코드 */}
                            <td>{stock[0]}</td>  
                            <td>{stock[1]}</td>  
                            <td>{stock[3]}</td> 
                            <td>{stock[4]}</td>
                        </tr>
                    ))
                ) : (
                    <tr><td colSpan="4">가격 상승률 데이터가 없습니다</td></tr>
                )}
                </tbody>
            </table>

            <h2>실시간 채팅</h2>
            <Channel id="main-channel" />  {/* 채팅 컴포넌트 추가 */}
        </Layout>
    );
}

export default Main;