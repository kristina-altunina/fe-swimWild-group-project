module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo','module:metro-react-native-babel-preset'],
    "plugins": [
      [
        "module-resolver",
        {
          extensions: [".tsx",".ts",".js",".josn"]
        },
     ],
     "module:react-native-dotenv", "react-native-reanimated/plugin"
   ]
};
};
