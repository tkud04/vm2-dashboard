import metrics from "./metrics"

export const size = {
  font10: Math.floor(metrics.screenWidth * (10 / 365)),
  font12: Math.floor(metrics.screenWidth * (12 / 365)),
  font14: Math.floor(metrics.screenWidth * (14 / 365)),
  font16: Math.floor(metrics.screenWidth * (16 / 365)),
  font18: Math.floor(metrics.screenWidth * (18 / 365)),
  font20: Math.floor(metrics.screenWidth * (20 / 365)),
  font22: Math.floor(metrics.screenWidth * (22 / 365))
}

export const fontScale = (size) => Math.floor(metrics.screenWidth * (size / 365))
