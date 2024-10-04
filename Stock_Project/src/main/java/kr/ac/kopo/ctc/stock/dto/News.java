package kr.ac.kopo.ctc.stock.dto;

public class News {
    private String title;
    private String link;
    private String time;
    private String source;  // 구글, 네이버, 다음

    // 생성자
    public News(String title, String link, String time, String source) {
        this.title = title;
        this.link = link;
        this.time = time;
        this.source = source;
    }

    // Getter와 Setter
    public String getTitle() { return title; }
    public String getLink() { return link; }
    public String getTime() { return time; }
    public String getSource() { return source; }

    public void setTitle(String title) { this.title = title; }
    public void setLink(String link) { this.link = link; }
    public void setTime(String time) { this.time = time; }
    public void setSource(String source) { this.source = source; }
}
