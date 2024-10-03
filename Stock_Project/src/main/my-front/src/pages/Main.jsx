import React, { useState, useEffect } from 'react';
import Layout from '../components/layout';
import axios from 'axios';

function Main() {
    const [stocks, setStocks] = useState([]);

    useEffect(() => {
        fetchStockList();
    }, []);

    const fetchStockList = () => {
        axios.get('http://localhost:8080/gdp')  // API 경로를 '/gdp'로 설정
            .then(response => {
                console.log(response.data);  // 응답 데이터 확인
                setStocks(response.data);
            })
            .catch(error => console.error('Error fetching stocks: ', error));
    };
    return (
        <Layout>
            <table border="1">
                <tbody>
                {Array.isArray(stocks) && stocks.length > 0 ? (
                    stocks.map(stock => (
                        <tr key={stock.년도}>
                            <td>kor GDP: {stock.년도} 명목GDP: {stock.명목GDP} 실질GDP성장률: {stock.실질GDP성장률}</td>
                        </tr>
                    ))
                ) : (
                    <tr><td>데이터가 없습니다</td></tr>
                )}
                </tbody>
            </table>
            <h1>메인페이지</h1>
        </Layout>
    );
}

export default Main;