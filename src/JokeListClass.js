import React from "react";
import axios from "axios";
import JokeClass from "./JokeClass";
import "./JokeList.css";

class JokeListClass extends React.Component {
  static defaultProps = { numJokesToGet: 10 };
  constructor(props) {
    super(props);
    this.state = { jokes: [] };
    this.generateNewJokes = this.generateNewJokes.bind(this);
    this.sortedJokes = this.sortedJokes.bind(this);
    this.vote = this.vote.bind(this);
  }

  async componentDidMount() {
    const { jokes } = this.state;

    let j = [...jokes];
    let seenJokes = new Set();

    try {
      while (j.length < this.props.numJokesToGet) {
        let res = await axios.get("https://icanhazdadjoke.com", {
          headers: { Accept: "application/json" },
        });

        let { status, ...jokeObj } = res.data;

        if (!seenJokes.has(jokeObj.id)) {
          seenJokes.add(jokeObj.id);
          j.push({ ...jokeObj, votes: 0 });
        } else {
          console.error("duplicate found!");
        }
      }
      this.setState({ jokes: j });
    } catch (e) {
      console.log(e);
    }
  }

  async componentDidUpdate(prevProps, prevState) {
    const { jokes } = this.state;
    if (this.props.numJokesToGet !== prevProps.numJokesToGet) {
      let j = [...jokes];
      let seenJokes = new Set();
      try {
        while (j.length < this.props.numJokesToGet) {
          let res = await axios.get("https://icanhazdadjoke.com", {
            headers: { Accept: "application/json" },
          });
          let { status, ...jokeObj } = res.data;

          if (!seenJokes.has(jokeObj.id)) {
            seenJokes.add(jokeObj.id);
            j.push({ ...jokeObj, votes: 0 });
          } else {
            console.error("duplicate found!");
          }
        }
        this.setState({ jokes: j });
      } catch (e) {
        console.log(e);
      }
    }

    if (this.state.jokes.length !== prevState.jokes.length) {
      let j = [...jokes];
      let seenJokes = new Set();
      try {
        while (j.length < this.props.numJokesToGet) {
          let res = await axios.get("https://icanhazdadjoke.com", {
            headers: { Accept: "application/json" },
          });
          let { status, ...jokeObj } = res.data;

          if (!seenJokes.has(jokeObj.id)) {
            seenJokes.add(jokeObj.id);
            j.push({ ...jokeObj, votes: 0 });
          } else {
            console.error("duplicate found!");
          }
        }
        this.setState({ jokes: j });
      } catch (e) {
        console.log(e);
      }
    }
  }

  generateNewJokes() {
    this.setState({ jokes: [] });
  }

  sortedJokes() {
    if (this.state.jokes) {
      return [...this.state.jokes].sort((a, b) => b.votes - a.votes);
    }
  }

  vote(id, delta) {
    const updatedJokes = this.state.jokes.map((j) =>
      j.id === id ? { ...j, votes: j.votes + delta } : j
    );
    this.setState({ jokes: updatedJokes });
  }

  render() {
    return (
      <div className="JokeList">
        <button className="JokeList-getmore" onClick={this.generateNewJokes}>
          Get New Jokes
        </button>

        {this.sortedJokes().map((j) => (
          <JokeClass
            text={j.joke}
            key={j.id}
            id={j.id}
            votes={j.votes}
            vote={this.vote}
          />
        ))}
      </div>
    );
  }
}

export default JokeListClass;
