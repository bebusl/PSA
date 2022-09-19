const Loading = () => {
  return (
    <div className="full-page center black-3">
      <div className="loader"></div>
      <h5>로딩중</h5>
    </div>
  );
};

export default Loading;

// .loader,
// .loader:after {
//     border-radius: 50%;
//     width: 1em;
//     height: 1em;
// }
// .loader {
//     position: relative;
//     text-indent: -9999em;
//     border-top: 0.3em solid #ede9d6;
//     border-right: 0.3em solid #ede9d6;
//     border-bottom: 0.3em solid #ede9d6;
//     border-left: 0.3em solid #585858;
//     -webkit-transform: translateZ(0);
//     -ms-transform: translateZ(0);
//     transform: translateZ(0);
//     -webkit-animation: load 1.1s infinite linear;
//     animation: load 1.1s infinite linear;
// }
// @-webkit-keyframes load {
//     0% {
//         -webkit-transform: rotate(0deg);
//         transform: rotate(0deg);
//     }
//     100% {
//         -webkit-transform: rotate(360deg);
//         transform: rotate(360deg);
//     }
// }
// @keyframes load {
//     0% {
//         -webkit-transform: rotate(0deg);
//         transform: rotate(0deg);
//     }
//     100% {
//         -webkit-transform: rotate(360deg);
//         transform: rotate(360deg);
//     }
// }
