### 中山大學數字驗證碼破解
### This is simple CNN model for validcode cracker.

validcode of NSYSU course selection system:
![](./validcode_0.jpg)

**Model**

This cnn model can help cracking the validcode. The accuracy is **82.3%** (95.25% each digits)
**Input: gray image with 28*28 pixel**
**Output: A vector of shape (10,), represents the confidence of each number (0~9)**


note that 0 is never appeared in this validcode system.

Dataset is provided, you can train your own.