"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// index.ts
var import_cors = __toESM(require("cors"));
var import_config = require("dotenv/config");
var import_express2 = __toESM(require("express"));

// src/observability/index.ts
var initObservability = () => {
};

// src/routes/chat.route.ts
var import_express = __toESM(require("express"));

// src/controllers/chat-config.controller.ts
var chatConfig = (_req, res) => __async(void 0, null, function* () {
  let starterQuestions = void 0;
  if (process.env.CONVERSATION_STARTERS && process.env.CONVERSATION_STARTERS.trim()) {
    starterQuestions = process.env.CONVERSATION_STARTERS.trim().split("\n");
  }
  return res.status(200).json({
    starterQuestions
  });
});

// src/controllers/engine/chat.ts
var import_llamaindex2 = require("llamaindex");

// src/controllers/engine/index.ts
var import_llamaindex = require("llamaindex");
var import_StorageContext = require("llamaindex/storage/StorageContext");

// src/controllers/engine/shared.ts
var STORAGE_CACHE_DIR = "./cache";

// src/controllers/engine/index.ts
function getDataSource() {
  return __async(this, null, function* () {
    const storageContext = yield (0, import_StorageContext.storageContextFromDefaults)({
      persistDir: `${STORAGE_CACHE_DIR}`
    });
    const numberOfDocs = Object.keys(
      storageContext.docStore.toDict()
    ).length;
    if (numberOfDocs === 0) {
      return null;
    }
    return yield import_llamaindex.VectorStoreIndex.init({
      storageContext
    });
  });
}

// src/controllers/engine/chat.ts
function createChatEngine() {
  return __async(this, null, function* () {
    const index = yield getDataSource();
    if (!index) {
      throw new Error(
        `StorageContext is empty - call 'npm run generate' to generate the storage first`
      );
    }
    const retriever = index.asRetriever();
    retriever.similarityTopK = process.env.TOP_K ? parseInt(process.env.TOP_K) : 3;
    return new import_llamaindex2.ContextChatEngine({
      chatModel: import_llamaindex2.Settings.llm,
      retriever,
      systemPrompt: process.env.SYSTEM_PROMPT
    });
  });
}

// src/controllers/chat-request.controller.ts
var convertMessageContent = (textMessage, imageUrl) => {
  if (!imageUrl) return textMessage;
  return [
    {
      type: "text",
      text: textMessage
    },
    {
      type: "image_url",
      image_url: {
        url: imageUrl
      }
    }
  ];
};
var chatRequest = (req, res) => __async(void 0, null, function* () {
  try {
    const { messages, data } = req.body;
    const userMessage = messages.pop();
    if (!messages || !userMessage || userMessage.role !== "user") {
      return res.status(400).json({
        error: "messages are required in the request body and the last message must be from the user"
      });
    }
    const userMessageContent = convertMessageContent(
      userMessage.content,
      data == null ? void 0 : data.imageUrl
    );
    const chatEngine = yield createChatEngine();
    const response = yield chatEngine.chat({
      message: userMessageContent,
      chatHistory: messages
    });
    const result = {
      role: "assistant",
      content: response.response
    };
    return res.status(200).json({
      result
    });
  } catch (error) {
    console.error("[LlamaIndex]", error);
    return res.status(500).json({
      detail: error.message
    });
  }
});

// src/controllers/chat.controller.ts
var import_ai2 = require("ai");
var import_llamaindex5 = require("llamaindex");

// src/controllers/llamaindex-stream.ts
var import_ai = require("ai");
var import_llamaindex4 = require("llamaindex");

// src/controllers/stream-helper.ts
var import_llamaindex3 = require("llamaindex");
function getNodeUrl(metadata) {
  const url = metadata["URL"];
  if (url) return url;
  const fileName = metadata["file_name"];
  if (!process.env.FILESERVER_URL_PREFIX) {
    console.warn(
      "FILESERVER_URL_PREFIX is not set. File URLs will not be generated."
    );
    return void 0;
  }
  if (fileName) {
    return `${process.env.FILESERVER_URL_PREFIX}/data/${fileName}`;
  }
  return void 0;
}
function appendSourceData(data, sourceNodes) {
  if (!(sourceNodes == null ? void 0 : sourceNodes.length)) return;
  data.appendMessageAnnotation({
    type: "sources",
    data: {
      nodes: sourceNodes.map((node) => {
        var _a;
        return __spreadProps(__spreadValues({}, node.node.toMutableJSON()), {
          id: node.node.id_,
          score: (_a = node.score) != null ? _a : null,
          url: getNodeUrl(node.node.metadata)
        });
      })
    }
  });
}
function appendEventData(data, title) {
  if (!title) return;
  data.appendMessageAnnotation({
    type: "events",
    data: {
      title
    }
  });
}
function appendToolData(data, toolCall, toolOutput) {
  data.appendMessageAnnotation({
    type: "tools",
    data: {
      toolCall: {
        id: toolCall.id,
        name: toolCall.name,
        input: toolCall.input
      },
      toolOutput: {
        output: toolOutput.output,
        isError: toolOutput.isError
      }
    }
  });
}
function createStreamTimeout(stream) {
  var _a;
  const timeout = Number((_a = process.env.STREAM_TIMEOUT) != null ? _a : 1e3 * 60 * 5);
  const t = setTimeout(() => {
    appendEventData(stream, `Stream timed out after ${timeout / 1e3} seconds`);
    stream.close();
  }, timeout);
  return t;
}
function createCallbackManager(stream) {
  const callbackManager = new import_llamaindex3.CallbackManager();
  callbackManager.on("retrieve", (data) => {
    const { nodes, query } = data.detail;
    appendEventData(stream, `Retrieving context for query: '${query}'`);
    appendEventData(
      stream,
      `Retrieved ${nodes.length} sources to use as context for the query`
    );
  });
  callbackManager.on("llm-tool-call", (event) => {
    const { name, input } = event.detail.payload.toolCall;
    const inputString = Object.entries(input).map(([key, value]) => `${key}: ${value}`).join(", ");
    appendEventData(
      stream,
      `Using tool: '${name}' with inputs: '${inputString}'`
    );
  });
  callbackManager.on("llm-tool-result", (event) => {
    const { toolCall, toolResult } = event.detail.payload;
    appendToolData(stream, toolCall, toolResult);
  });
  return callbackManager;
}

// src/controllers/llamaindex-stream.ts
var convertMessageContent2 = (content, annotations) => {
  if (!annotations) return content;
  return [
    {
      type: "text",
      text: content
    },
    ...convertAnnotations(annotations)
  ];
};
var convertAnnotations = (annotations) => {
  const content = [];
  annotations.forEach((annotation) => {
    if (!(annotation && typeof annotation === "object" && "type" in annotation && "data" in annotation && annotation.data && typeof annotation.data === "object")) {
      console.log(
        "Client sent invalid annotation. Missing data and type",
        annotation
      );
      return;
    }
    const { type, data } = annotation;
    if (type === "image" && "url" in data && typeof data.url === "string") {
      content.push({
        type: "image_url",
        image_url: {
          url: data.url
        }
      });
    }
    if (type === "csv" && "csvFiles" in data && Array.isArray(data.csvFiles)) {
      const rawContents = data.csvFiles.map((csv) => {
        return "```csv\n" + csv.content + "\n```";
      });
      const csvContent = "Use data from following CSV raw contents:\n" + rawContents.join("\n\n");
      content.push({
        type: "text",
        text: csvContent
      });
    }
  });
  return content;
};
function createParser(res, data) {
  const it = res[Symbol.asyncIterator]();
  const trimStartOfStream = (0, import_ai.trimStartOfStreamHelper)();
  let sourceNodes;
  return new ReadableStream({
    pull(controller) {
      return __async(this, null, function* () {
        var _a2;
        const { value, done } = yield it.next();
        if (done) {
          if (sourceNodes) {
            appendSourceData(data, sourceNodes);
          }
          controller.close();
          data.close();
          return;
        }
        let delta;
        if (value instanceof import_llamaindex4.Response) {
          if (value.sourceNodes) {
            sourceNodes = value.sourceNodes;
          }
          delta = (_a2 = value.response) != null ? _a2 : "";
        } else {
          delta = value.response.delta;
        }
        const text = trimStartOfStream(delta != null ? delta : "");
        if (text) {
          controller.enqueue(text);
        }
      });
    }
  });
}
function LlamaIndexStream(response, data, opts) {
  return createParser(response, data).pipeThrough((0, import_ai.createCallbacksTransformer)(opts == null ? void 0 : opts.callbacks)).pipeThrough((0, import_ai.createStreamDataTransformer)());
}

// src/controllers/chat.controller.ts
var chat = (req, res) => __async(void 0, null, function* () {
  var _a;
  const vercelStreamData = new import_ai2.StreamData();
  const streamTimeout = createStreamTimeout(vercelStreamData);
  try {
    const { messages } = req.body;
    const userMessage = messages.pop();
    if (!messages || !userMessage || userMessage.role !== "user") {
      return res.status(400).json({
        error: "messages are required in the request body and the last message must be from the user"
      });
    }
    const chatEngine = yield createChatEngine();
    let annotations = userMessage.annotations;
    if (!annotations) {
      annotations = (_a = messages.slice().reverse().find(
        (message) => message.role === "user" && message.annotations
      )) == null ? void 0 : _a.annotations;
    }
    const userMessageContent = convertMessageContent2(
      userMessage.content,
      annotations
    );
    const callbackManager = createCallbackManager(vercelStreamData);
    const response = yield import_llamaindex5.Settings.withCallbackManager(callbackManager, () => {
      return chatEngine.chat({
        message: userMessageContent,
        chatHistory: messages,
        stream: true
      });
    });
    const stream = LlamaIndexStream(response, vercelStreamData);
    return (0, import_ai2.streamToResponse)(stream, res, {}, vercelStreamData);
  } catch (error) {
    console.error("[LlamaIndex]", error);
    return res.status(500).json({
      detail: error.message
    });
  } finally {
    clearTimeout(streamTimeout);
  }
});

// src/controllers/engine/settings.ts
var import_llamaindex6 = require("llamaindex");
var import_HuggingFaceEmbedding = require("llamaindex/embeddings/HuggingFaceEmbedding");
var import_OllamaEmbedding = require("llamaindex/embeddings/OllamaEmbedding");
var import_ollama = require("llamaindex/llm/ollama");
var CHUNK_SIZE = 512;
var CHUNK_OVERLAP = 20;
var initSettings = () => __async(void 0, null, function* () {
  console.log(`Using '${process.env.MODEL_PROVIDER}' model provider`);
  if (!process.env.MODEL || !process.env.EMBEDDING_MODEL) {
    throw new Error("'MODEL' and 'EMBEDDING_MODEL' env variables must be set.");
  }
  switch (process.env.MODEL_PROVIDER) {
    case "ollama":
      initOllama();
      break;
    case "anthropic":
      initAnthropic();
      break;
    case "gemini":
      initGemini();
      break;
    default:
      initOpenAI();
      break;
  }
  import_llamaindex6.Settings.chunkSize = CHUNK_SIZE;
  import_llamaindex6.Settings.chunkOverlap = CHUNK_OVERLAP;
});
function initOpenAI() {
  var _a;
  import_llamaindex6.Settings.llm = new import_llamaindex6.OpenAI({
    model: (_a = process.env.MODEL) != null ? _a : "gpt-3.5-turbo",
    maxTokens: process.env.LLM_MAX_TOKENS ? Number(process.env.LLM_MAX_TOKENS) : void 0
  });
  import_llamaindex6.Settings.embedModel = new import_llamaindex6.OpenAIEmbedding({
    model: process.env.EMBEDDING_MODEL,
    dimensions: process.env.EMBEDDING_DIM ? parseInt(process.env.EMBEDDING_DIM) : void 0
  });
}
function initOllama() {
  var _a, _b, _c;
  const config = {
    host: (_a = process.env.OLLAMA_BASE_URL) != null ? _a : "http://127.0.0.1:11434"
  };
  import_llamaindex6.Settings.llm = new import_ollama.Ollama({
    model: (_b = process.env.MODEL) != null ? _b : "",
    config
  });
  import_llamaindex6.Settings.embedModel = new import_OllamaEmbedding.OllamaEmbedding({
    model: (_c = process.env.EMBEDDING_MODEL) != null ? _c : "",
    config
  });
}
function initAnthropic() {
  const embedModelMap = {
    "all-MiniLM-L6-v2": "Xenova/all-MiniLM-L6-v2",
    "all-mpnet-base-v2": "Xenova/all-mpnet-base-v2"
  };
  import_llamaindex6.Settings.llm = new import_llamaindex6.Anthropic({
    model: process.env.MODEL
  });
  import_llamaindex6.Settings.embedModel = new import_HuggingFaceEmbedding.HuggingFaceEmbedding({
    modelType: embedModelMap[process.env.EMBEDDING_MODEL]
  });
}
function initGemini() {
  import_llamaindex6.Settings.llm = new import_llamaindex6.Gemini({
    model: process.env.MODEL
  });
  import_llamaindex6.Settings.embedModel = new import_llamaindex6.GeminiEmbedding({
    model: process.env.EMBEDDING_MODEL
  });
}

// src/routes/chat.route.ts
var llmRouter = import_express.default.Router();
initSettings();
llmRouter.route("/").post(chat);
llmRouter.route("/request").post(chatRequest);
llmRouter.route("/config").get(chatConfig);
var chat_route_default = llmRouter;

// index.ts
var app = (0, import_express2.default)();
var port = parseInt(process.env.PORT || "8000");
var env = process.env["NODE_ENV"];
var isDevelopment = !env || env === "development";
var prodCorsOrigin = process.env["PROD_CORS_ORIGIN"];
initObservability();
app.use(import_express2.default.json());
if (isDevelopment) {
  console.warn("Running in development mode - allowing CORS for all origins");
  app.use((0, import_cors.default)());
} else if (prodCorsOrigin) {
  console.log(
    `Running in production mode - allowing CORS for domain: ${prodCorsOrigin}`
  );
  const corsOptions = {
    origin: prodCorsOrigin
    // Restrict to production domain
  };
  app.use((0, import_cors.default)(corsOptions));
} else {
  console.warn("Production CORS origin not set, defaulting to no CORS.");
}
app.use("/api/files/data", import_express2.default.static("data"));
app.use("/api/files/tool-output", import_express2.default.static("tool-output"));
app.use(import_express2.default.text());
app.get("/", (req, res) => {
  res.send("LlamaIndex Express Server");
});
app.use("/api/chat", chat_route_default);
app.listen(port, () => {
  console.log(`\u26A1\uFE0F[server]: Server is running at http://localhost:${port}`);
});
