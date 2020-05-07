import { formatMessage } from 'umi-plugin-locale'

export default function(props) {
  return (
    <div className="normal">
      <ul className="list">
      <div>{ props.location.pathname }</div>
        <li>To get started, edit <code>src/pages/index.js</code> and save to reload.</li>
        <li>
          <a href="https://umijs.org/guide/getting-started.html">
            {formatMessage({ id: 'index.start' })}
          </a>
        </li>
      </ul>
    </div>
  );
}
