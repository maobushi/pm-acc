// // SPDX-License-Identifier: MIT
// pragma solidity ^0.8.19;

// // import {FunctionsClient} from "@chainlink/contracts/src/v0.8/functions/FunctionsClient.sol";
// // import {FunctionsRequest} from "@chainlink/contracts/src/v0.8/functions/libraries/FunctionsRequest.sol";
// import {FunctionsClient} from "@chainlink/contracts/src/v0.8/functions/FunctionsClient.sol";
// import {FunctionsRequest} from "@chainlink/contracts/src/v0.8/functions/libraries/FunctionsRequest.sol";

// contract ChainlinkFunctionsExample is FunctionsClient {
//     using FunctionsRequest for FunctionsRequest.Request;

//     address private owner;
//     mapping(bytes32 => string) private results; // リクエストID -> 結果

//     event RequestSent(bytes32 indexed requestId); // リクエスト送信イベント
//     event RequestFulfilled(bytes32 indexed requestId, string result); // データ取得イベント

//     constructor(address router) FunctionsClient(router) {
//         owner = msg.sender;
//     }

//     modifier onlyOwner() {
//         require(msg.sender == owner, "Only the owner can call this function");
//         _;
//     }

//     // データリクエスト
//     function requestData(
//         uint64 subscriptionId,
//         uint32 callbackGasLimit,
//         bytes32 donId,
//         string memory sourceCode,
//         string[] memory args
//     ) external onlyOwner {
//         FunctionsRequest.Request memory req;
//         req.initializeRequestForInlineJavaScript(sourceCode); // JavaScriptソースコードを設定

//         for (uint256 i = 0; i < args.length; i++) {
//             req.addString(args[i]); // 引数を追加
//         }

//         bytes32 requestId = _sendRequest(
//             req.encodeCBOR(),
//             subscriptionId,
//             callbackGasLimit,
//             donId
//         );

//         emit RequestSent(requestId);
//     }

//     // Chainlink Functionsがデータを返す際に呼び出される
//     function fulfillRequest(
//         bytes32 requestId,
//         bytes memory response,
//         bytes memory err
//     ) internal override {
//         if (err.length > 0) {
//             emit RequestFulfilled(requestId, "Error");
//         } else {
//             string memory result = string(response);
//             results[requestId] = result; // 結果を保存
//             emit RequestFulfilled(requestId, result);
//         }
//     }

//     // リクエスト結果を取得
//     function getResult(bytes32 requestId) external view returns (string memory) {
//         return results[requestId];
//     }
// }
