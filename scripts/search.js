'use strict';

if (userActive) {
    const navPageNum = document.getElementById("nav-page-num");
    const inputQuery = document.getElementById("input-query");
    const btnSubmit = document.getElementById("btn-submit");

    const newsContainer = document.getElementById("news-container");
    const btnPrev = document.getElementById("btn-prev");
    const pageNum = document.getElementById("page-num");
    const btnNext = document.getElementById("btn-next");

    let totalResults = 0;
    let keywords = "";
    navPageNum.style.display = "none";

    btnSubmit.addEventListener("click", function () {
        pageNum.textContent = "1";
        newsContainer.innerHTML = "";

        // kiểm tra người dùng đã nhập keywords chưa
        if (inputQuery.value.trim().length === 0) {
            // ẩn các nút chuyển trang nếu chưa nhập keywords
            navPageNum.style.display = "none";
            alert("Vui lòng nhập để tìm kiếm !");

        } else {
            keywords = inputQuery.value;
            //gọi hàm hiển thị list news lên 
            getDataNewsKeywords(keywords, 1);
        }
    });

    // Hàm bất đồng bộ để lấy dữ liệu được tìm kiếm từ từ khóa đã nhập và hiển thị
    async function getDataNewsKeywords(keywords, page) {
        try {
            const res = await fetch(
                `https://newsapi.org/v2/everything?q=${keywords}&sortBy=relevancy&pageSize=${userActive.pageSize}&page=${page}&apiKey=d4a86dbe9cc545969c7bdf1fde1da721`
            );
            const data = await res.json();

            // Nếu không có bài viết thì thông báo
            if (data.totalResults == 0) {
                navPageNum.style.display = "none";
                throw new Error(
                    "Không có bài viết nào phù hợp với từ khóa bạn tìm kiếm !"
                );
            }

            // Hiển thị các nút chuyển trang nếu dữ liệu trả về thành công
            navPageNum.style.display = "block";
            // hiển thị list news
            displayNewList(data);
            // bắt lỗi và thông báo cho người dùng
        } catch (err) {
            alert(err.message);
        }
    }

    // Hàm kiểm tra điều kiện nút ấn Prev
    function checkBtnPrev() {
        if (pageNum.textContent == 1) {
            btnPrev.style.display = "none";

        } else {
            btnPrev.style.display = "block";

        }
    }

    // Hàm kiểm tra điều kiện nút ấn Next

    function checkBtnNext() {
        if (pageNum.textContent == Math.ceil(totalResults / userActive.pageSize)) {
            btnNext.style.display = "none";
        } else {
            btnNext.style.display = "block";

        }
    }

    // Bắt sự kiện click Prev
    btnPrev.addEventListener("click", function () {
        getDataNewsKeywords(keywords, --pageNum.textContent);
    });

    // Bắt sự kiện click Next
    btnNext.addEventListener("click", function () {
        getDataNewsKeywords(keywords, ++pageNum.textContent);
    });

    // Hàm hiển thị các list news
    function displayNewList(data) {
        totalResults = data.totalResults;
        checkBtnPrev();

        checkBtnNext();

        let html = "";
        data.articles.forEach(function (article) {
            html += `
            <div id="news-container">
				<div class="card flex-row flex-wrap">
					<div class="card mb-3" style="">
						<div class="row no-gutters">
							<div class="col-md-4">
								<img src=${article.urlToImage ? article.urlToImage : "no_image_available.jpg"
                }
									class="card-img"
									alt="MIT researchers uncover ‘unpatchable’ flaw in Apple M1 chips - TechCrunch">
							</div>
							<div class="col-md-8">
								<div class="card-body">
									<h5 class="card-title">${article.title}</h5>
									<p class="card-text">${article.description}</p>
									<a  href=${article.url}
										class="btn btn-primary">View</a>
								</div>
							</div>
						</div>
					</div>
				</div>
            </div>
            `;
        });

        newsContainer.innerHTML = html;
    }

} else {
    alert("Vui lòng đăng nhập / đăng ký để truy cập ứng dụng");
    window.location.href = "../index.html";
}