export interface GenerateAccessToken {
  generateAccessToken(account: { username: string }): Promise<string>
}
