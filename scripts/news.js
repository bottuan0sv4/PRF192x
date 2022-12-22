'use strict';

// Khi người dùng chưa đăng nhập thì sẽ không thể dùng chức năng News
if(userActive){
    const btnNext = document.getElementById("btn-next");
    const btnPrev = document.getElementById("btn-prev");
    const newsContainer = document.getElementById("news-container");
    const pageNum = document.getElementById("page-num");

    // Biến tính số News tối đa trả về từ API
    let totalResults = 0;

    getDataNews("us",1);

    // Hàm lấy dữ liệu data news từ API và hiển thị list news ra ứng dụng
    async function getDataNews(country, page){
        try {
            // Kết nối với API và lấy dữ liệu
            const res = await fetch(
                `https://newsapi.org/v2/top-headlines?country=${country}&category=${userActive.category}&pageSize=${userActive.pageSize}&page=${page}&apiKey=d4a86dbe9cc545969c7bdf1fde1da721`
            );
            const data = await res.json();
                // gọi hàm hiển thị list news
            displayNewList(data);

                // Bắt lỗi
        }catch(err){
            alert("Error: " + err.message);
        }
    }
// Kiểm tra điều kiện ẩn và ấn nút Prev
    function checkBtnPrev(){
// Page number = 1 thì ẩn
        if(pageNum.textContent == 1){
            btnPrev.style.display = "none";

        }else{
            btnPrev.style.display = "block";

        }
    }

// Kiểm tra điều kiện ẩn và ấn nút Next
    function checkBtnNext(){
        if(pageNum.textContent == Math.ceil(totalResults / userActive.pageSize)){
            btnNext.style.display = "none";
        }else{
            btnNext.style.display = "block";

        }
    }

// Bắt sự kiện ấn nút prev
    btnPrev.addEventListener("click", function (){
        // gọi hàm để lấy dữ liệu và hiển thị danh sách các news
        getDataNews("us", --pageNum.textContent);
    });

// Bắt sự kiện ấn nút Next
    btnNext.addEventListener("click", function (){
        // gọi hàm để lấy dữ liệu và hiển thị danh sách các news
        getDataNews("us", ++pageNum.textContent);
    });

// Hàm hiển thị list news
    function displayNewList(data){
        totalResults = data.totalResults;
        checkBtnPrev();
        checkBtnNext();

        let html = "";
        // Tạo code html các news để thiển thị
        // no_image_available để thay thể cho 1 số ảnh lỗi
        data.articles.forEach(function(article) {
            html += `
            <div id="news-container">
				<div class="card flex-row flex-wrap">
					<div class="card mb-3" style="">
						<div class="row no-gutters">
							<div class="col-md-4">
								<img src=${
                                    article.urlToImage ? article.urlToImage : "no_image_available.jpg"
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

// Nếu chưa đăng nhập thì thông báo người dùng đăng nhập
}else{
        alert("Vui lòng đăng nhập / đăng ký để truy cập ứng dụng");
        window.location.href = "../index.html";
}




        