# Git Workflow Rules

## 分支管理
- **Branching Policy**: 在开始任何代码修改任务前，必须基于 master/main 分支创建一个新的 feature 分支。分支命名规范为 `feat/task-description`。
- **开发流程**: 在功能分支上开发时，完成后应先在本地使用 `npm run dev` 预览效果，不要随意推送代码到远程。

## 提交规范
- **Commit Strategy**: 任务执行过程中，按逻辑功能进行小步提交，严禁直接在 master 分支操作。
- **推送规则**: 严禁未经用户同意擅自推送代码。只有在用户明确说"可以推送"、"推送吧"、"提交代码"时才执行 `git push`。

## Review 流程
- **Review Protocol**: 任务完成后，严禁自动合并。必须向用户报告："任务已在分支 [branch-name] 完成，请 Review 代码"。
- **Preview 优先**: 提交代码后，应先通过本地预览（`npm run dev` 或 `npm run preview`）让用户查看效果，只有用户确认满意后才推送。

## 合并规范
- **Merge Order**: 只有在用户明确回复"Review 通过"或"确认合并"后，才能切换回 master/main 并执行 git merge 和 git push。
