package kr.ac.kopo.ctc.stock.service;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

import kr.ac.kopo.ctc.stock.dto.News;
import java.util.ArrayList;
import java.util.List;
public class News_Crawl {
	public List<News> googleCrawl(String stockName) {
	    List<News> newsList = new ArrayList<>();

	    try {
	        String url = "https://www.google.com/search?q=" + stockName + "&tbm=nws";
	        Document doc = Jsoup.connect(url).userAgent("Mozilla/5.0").get();
	        Elements newsItems = doc.select(".SoaBEf");  // 뉴스 아이템을 감싸는 요소로 선택자 변경

	        for (Element item : newsItems) {
	            try {
	                String title = item.select(".mCBkyc").text();  // 뉴스 제목 선택자
	                String link = item.select("a").attr("href");
	                String time = item.select(".WG9SHc span").text();  // 뉴스 시간 선택자
	                System.out.println("Google: " + title + " / Time: " + time);


	                News news = new News(title, link, time, "Google");
	                newsList.add(news);
	            } catch (Exception e) {
	                System.out.println("Error parsing Google news item: " + e.getMessage());
	            }
	        }
	    } catch (Exception e) {
	        e.printStackTrace();
	    }

	    return newsList;
	}

	
	public List<News> naverCrawl(String stockName) {
	    List<News> newsList = new ArrayList<>();
	    
	    try {
	        String url = "https://search.naver.com/search.naver?where=news&query=" + stockName + "&sort=0";
	        Document doc = Jsoup.connect(url).userAgent("Mozilla/5.0").get();
	        Elements newsItems = doc.select(".news_tit");

	        for (Element item : newsItems) {
	            String title = item.attr("title");
	            String link = item.attr("href");
	            Element timeElement = item.parent().parent().selectFirst("div span");
                String time = timeElement.text();
                System.out.println("Naver: " + title + " / Time: " + time);

	            News news = new News(title, link, time, "Naver");
	            newsList.add(news);
	        }
	    } catch (Exception e) {
	        e.printStackTrace();
	    }

	    return newsList;
	}
	
	
	
	public List<News> daumCrawl(String stockName) {
	    List<News> newsList = new ArrayList<>();

	    try {
	        String url = "https://search.daum.net/search?w=news&q=" + stockName + "&sort=0";
	        Document doc = Jsoup.connect(url).userAgent("Mozilla/5.0").get();
	        Elements newsItems = doc.select(".tit-g");  // 뉴스 제목을 감싸는 요소로 선택자 변경

	        for (Element item : newsItems) {
	            try {
	                String title = item.text();  // 뉴스 제목
	                String link = item.select("a").attr("href");
	                String time = item.parent().select(".f_nb.date").text();  // 뉴스 시간 선택자
	                System.out.println("Daum " + title);

	                News news = new News(title, link, time, "Daum");
	                newsList.add(news);
	            } catch (Exception e) {
	                System.out.println("Error parsing Daum news item: " + e.getMessage());
	            }
	        }
	    } catch (Exception e) {
	        e.printStackTrace();
	    }
	    return newsList;
	}


}
