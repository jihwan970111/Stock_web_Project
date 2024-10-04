import React, { useState, useEffect } from 'react';
import Layout from '../components/layout';
import axios from 'axios';
import Channel from '../components/Channel'; // 채팅 컴포넌트 임포트

function Main() {
    const [gdpStocks, setGdpStocks] = useState([]);
    const [priceIncreaseStocks, setPriceIncreaseStocks] = useState([]);
    const [selectedStock, setSelectedStock] = useState(null);  // 선택된 종목 관리
    const [newsData, setNewsData] = useState([]);  // 뉴스 데이터 관리
    const [loading, setLoading] = useState(false);  // 뉴스 로딩 상태 관리

    useEffect(() => {
        fetchStockList();
        fetchPriceIncreaseRate();  // 날짜 없이 가격 상승률 데이터 요청
    }, []);

    const fetchStockList = () => {
        axios.get('http://localhost:8080/gdp')  // API 경로를 '/gdp'로 설정
            .then(response => {
                console.log("GDP 데이터:", response.data);  // 응답 데이터 확인
                setGdpStocks(response.data);
            })
            .catch(error => console.error('Error fetching stocks: ', error));
    };

    const fetchPriceIncreaseRate = () => {
        axios.get('http://localhost:8080/priceIncreaseRate')  // 날짜 없이 호출
            .then(response => {
                setPriceIncreaseStocks(response.data);
            })
            .catch(error => console.error('Error fetching price increase rate: ', error));
    };

    // 종목 클릭 시 선택 상태 변경 및 뉴스 가져오기
    const handleStockClick = (stockCode, stockName) => {
        if (selectedStock === stockCode) {
            setSelectedStock(null);  // 이미 클릭된 종목을 다시 클릭하면 닫기
            setNewsData([]);  // 뉴스 데이터 초기화
        } else {
            setSelectedStock(stockCode);  // 새로운 종목 클릭 시 해당 종목 열기
            fetchNews(stockName);  // 선택된 종목의 뉴스 데이터 가져오기
        }
    };

    const fetchNews = (stockName) => {
        setLoading(true);  // 뉴스 로딩 시작
    
        // 뉴스 데이터를 수집하는 요청을 먼저 보냄
        axios.post(`http://localhost:8080/api/news/collect`, null, {
            params: {
                stockName: stockName
            }
        })
        .then(response => {
            console.log(response.data);  // 서버에서 반환된 데이터를 콘솔에 출력
            const newsData = response.data;  // 이미 객체로 파싱된 데이터로 사용
            setLoading(false);  // 뉴스 로딩 완료
            setNewsData(newsData);  // 서버에서 반환된 뉴스 데이터 업데이트
        })
        .catch(error => {
            setLoading(false);  // 로딩 종료
            console.error('Error collecting news: ', error);  // 에러 메시지 출력
        });
    };

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

            <h2>주식 랭킹(가격 상승률) 50건</h2>
            <table border="1">
                <thead>
                    <tr>
                        <th>순위</th>
                        <th>종목코드</th>
                        <th>종목명</th>
                        <th>종가</th>
                        <th>상승률</th>
                    </tr>
                </thead>
                <tbody>
                {Array.isArray(priceIncreaseStocks) && priceIncreaseStocks.length > 0 ? (
                    priceIncreaseStocks.map((stock, index) => (
                        <React.Fragment key={stock[0]}>
                            <tr onClick={() => handleStockClick(stock[0], stock[2])} style={{ cursor: 'pointer' }}>
                                <td>{index + 1}</td> 
                                <td>{stock[0]}</td>  
                                <td>{stock[2]}</td>
                                <td>{stock[4]}</td>  
                                <td>{parseFloat(stock[5]).toFixed(2)}</td> 
                            </tr>

                            {selectedStock === stock[0] && (
                                <tr>
                                    <td colSpan="5">
                                        <div style={{ padding: '10px', backgroundColor: '#f0f0f0', border: '1px solid #ddd' }}>
                                            <h3>{stock[2]} 상세 정보</h3>
                                            <p>현재가: {stock[4]}</p>
                                            <p>상승률: {parseFloat(stock[5]).toFixed(2)}%</p>
                                            <p>거래량: {stock[1]}</p> 

                                            <h4>최근 뉴스</h4>
                                            {Array.isArray(newsData) && newsData.length > 0 ? (
                                        <ul>
                                            {newsData.slice(0, 15).map((news, i) => (
                                                <li key={i}>
                                                    <a href={news.link} target="_blank" rel="noopener noreferrer">{news.title}</a> ({news.time})
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p>뉴스 데이터가 없습니다</p>
                                    )}
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </React.Fragment>
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
