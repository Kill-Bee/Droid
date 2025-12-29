import "./rating.css";

export default function Rating() {
  return (
    <div className="background-hitam">
      <div className="container-rating">
        <div className="horizontal-banner" />
        <table className="table">
          <tbody>
            <tr>
              <td className="table-col-left">
                <img
                  src="https://cdn.myanimelist.net/images/anime/1015/138006.jpg"
                  alt="banner img"
                  className="vertical-banner"
                />
                <h1 className="h3-left">NARUTO</h1>
                <hr />
              </td>
              <td className="table-col-right">
                <h1 className="text-light">Naruto</h1>
                <label htmlFor="">synopsis</label>
                <p className="text-light">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Corrupti, ut cupiditate fugit adipisci obcaecati aliquam rem
                  maxime nobis vel nostrum incidunt mollitia laboriosam eaque
                  quia eius error veniam veritatis laudantium necessitatibus?
                  Consequatur odio corrupti exercitationem eum reprehenderit nam
                  laborum aliquid.
                </p>
                <div className="hero-tags">
                  <span className="tag">Adaptasi komik</span>
                  <span className="tag">Berjuang</span>
                  <span className="tag">Inspiratif</span>
                  <span className="tag">Diperbarui ke E 35</span>
                </div>
                <hr />
                <div className="buttons-rating">
                  <button>Rating ⭐</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
