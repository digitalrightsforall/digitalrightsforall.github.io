# Git Workflow Rules
- **Branching Policy**: 在开始任何代码修改任务前，必须基于 master/main 分支创建一个新的 feature 分支。分支命名规范为 `feat/task-description`。
- **Commit Strategy**: 任务执行过程中，按逻辑功能进行小步提交，严禁直接在 master 分支操作。
- **Review Protocol**: 任务完成后，严禁自动合并。必须向用户报告："任务已在分支 [branch-name] 完成，请 Review 代码"。
- **Merge Order**: 只有在用户明确回复"Review 通过"或"确认合并"后，才能切换回 master 并执行 git merge。
