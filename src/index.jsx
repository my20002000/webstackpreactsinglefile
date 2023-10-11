import { render, Component } from "preact";
import "./style.css";
import { data } from "./data";
import twitter from "./img/twitter_96px.png";
import youtube from "./img/youtube_play_button_96px.png";
import bookmark from "./img/bookmark_96px.png";
import logo from "./img/logo.png";
import defaultImage from "./img/website_96px.png";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fill: "",
    };
  }
  scrollToAnchor = (anchorName) => {
    if (anchorName) {
      let anchorElement = document.getElementById(anchorName);
      if (anchorElement) {
        anchorElement.scrollIntoView({ block: "start", behavior: "smooth" });
      }
    }
  };

  render() {
    return (
      <div>
        <div class="sidebar">
          <div class="sidebarfix">
            <a href="#"><img src={logo}></img></a>
            
            <ul class="sidebarmenu">
              {data.map((todo) => (
                <div>
                  <li onClick={() => this.scrollToAnchor(todo.tips)}>
                    <Bookmark className="bookmark-icon" fill={this.state.fill}></Bookmark>
                    <a >
                      {todo.tips}
                    </a>
                  </li>
                </div>
              ))}
            </ul>
          </div>
        </div>
        <div class="main">
          <h1>Get Started building Vite-powered Preact Apps </h1>
          {data.map((todo) => (
            <TipsSection key={todo.id} tips={todo.tips} data={todo.data} />
          ))}
          {/* {data.map((todo) => {
          return (
            <div key={todo.id}>
              <h3 className="tipstitle">
                <img src={bookmark} width="32px" />
                {todo.tips}
              </h3>
              <section>
                {todo.data.map((t) => (
                  <ResourceItem
                    title={t.title}
                    description={t.description}
                    href={t.href}
                  />
                ))}
              </section>
            </div>
          );
        })} */}
        </div>
      </div>
    );
  }
}
function TipsSection({ tips, data }) {
  return (
    <div>
      <h3 className="tipstitle" id={tips}>
        <img src={bookmark} width="32px" />
        {tips}
      </h3>
      <section>
        {data.map((t) => (
          <ResourceItem
            key={t.id}
            title={t.title}
            description={t.description}
            href={t.href}
          />
        ))}
      </section>
    </div>
  );
}

class Bookmark extends Component {
  render() {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 48 48"
        width="24"
        height="24"
        fill="#979898"
      >
        <path d="M37,43l-13-6l-13,6V9c0-2.2,1.8-4,4-4h18c2.2,0,4,1.8,4,4V43z" />
      </svg>
    );
  }
}

class ResourceItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [
        { path: twitter, condition: "twitter.com" },
        { path: youtube, condition: "youtube.com" },
      ],
      isShow: false,
    };
  }
  render(props) {
    return (
      <a class="item" href={props.href} target="_blank">
        <div class="resource">
          <div class="header">
            {this.state.images.map((image) => {
              if (props.href.includes(image.condition)) {
                this.state.isShow = true;
                return <img className="logo" src={image.path} />;
              }
            })}
            {this.state.isShow == false && (
              <img className="logo" src={defaultImage} />
            )}
            <h3 class="title">{decodeURIComponent(props.title)}</h3>
          </div>
          <div class="content">
            <p>{props.description}</p>
          </div>
        </div>
      </a>
    );
  }
}
render(<App />, document.getElementById("app"));
