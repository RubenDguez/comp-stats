export default class GitHub {
    public static readonly triggers: Array<IGitHubTriggers> = [
        {
            on: "push",
            normalized: "Push",
            Description: "Triggered when code is pushed to a branch",
        },
        {
            on: "pull_request",
            normalized: "Pull Request",
            Description:
                "Triggered when a pull request is opened, synchronized, or reopened",
        },
        {
            on: "schedule",
            normalized: "Schedule",
            Description: "Triggered on a scheduled interval using cron syntax",
        },
        {
            on: "workflow_dispatch",
            normalized: "Workflow Dispatch",
            Description: "Manually triggered via the GitHub Actions UI",
        },
        {
            on: "repository_dispatch",
            normalized: "Repository Dispatch",
            Description: "Triggered by an external service via the GitHub API",
        },
        {
            on: "workflow_run",
            normalized: "Workflow Run",
            Description: "Triggered after another workflow completes",
        },
        {
            on: "check_run",
            normalized: "Check Run",
            Description: "Triggered by a check run event (CI checks from apps)",
        },
        {
            on: "check_suite",
            normalized: "Check Suite",
            Description:
                "Triggered by check suite events (collections of check runs)",
        },
        {
            on: "create",
            normalized: "Create",
            Description: "Triggered when a branch or tag is created",
        },
        {
            on: "delete",
            normalized: "Delete",
            Description: "Triggered when a branch or tag is deleted",
        },
        {
            on: "deployment",
            normalized: "Deployment",
            Description: "Triggered when a deployment is created",
        },
        {
            on: "deployment_status",
            normalized: "Deployment Status",
            Description: "Triggered when a deployment status changes",
        },
        {
            on: "discussion",
            normalized: "Discussion",
            Description: "Triggered when a GitHub Discussion is created or modified",
        },
        {
            on: "discussion_comment",
            normalized: "Discussion Comment",
            Description: "Triggered when a comment is added to a Discussion",
        },
        {
            on: "fork",
            normalized: "Fork",
            Description: "Triggered when someone forks the repository",
        },
        {
            on: "gollum",
            normalized: "Wiki (Gollum)",
            Description: "Triggered when the wiki is updated",
        },
        {
            on: "issue_comment",
            normalized: "Issue Comment",
            Description:
                "Triggered when a comment is added to an issue or pull request",
        },
        {
            on: "issues",
            normalized: "Issues",
            Description:
                "Triggered for issue events like opened, closed, labeled, etc.",
        },
        {
            on: "label",
            normalized: "Label",
            Description: "Triggered when a label is created, edited, or deleted",
        },
        {
            on: "merge_group",
            normalized: "Merge Group",
            Description: "Triggered when a merge group is created in merge queue",
        },
        {
            on: "milestone",
            normalized: "Milestone",
            Description: "Triggered for milestone events (created, closed, etc.)",
        },
        {
            on: "page_build",
            normalized: "Page Build",
            Description: "Triggered when a GitHub Pages site is built",
        },
        {
            on: "project",
            normalized: "Project",
            Description: "Triggered when a project is created, updated, or deleted",
        },
        {
            on: "project_card",
            normalized: "Project Card",
            Description:
                "Triggered when a project card is created, updated, moved, or deleted",
        },
        {
            on: "project_column",
            normalized: "Project Column",
            Description:
                "Triggered when a project column is created, updated, or deleted",
        },
        {
            on: "public",
            normalized: "Public",
            Description: "Triggered when a repository is made public",
        },
        {
            on: "pull_request_review",
            normalized: "Pull Request Review",
            Description:
                "Triggered when a pull request review is submitted, edited, or dismissed",
        },
        {
            on: "pull_request_review_comment",
            normalized: "Pull Request Review Comment",
            Description: "Triggered when a comment is made on a pull request review",
        },
        {
            on: "pull_request_target",
            normalized: "Pull Request Target",
            Description:
                "Like `pull_request`, but runs in the context of the base repo",
        },
        {
            on: "registry_package",
            normalized: "Registry Package",
            Description:
                "Triggered when a package is published or updated in GitHub Package Registry",
        },
        {
            on: "release",
            normalized: "Release",
            Description: "Triggered when a release is published, edited, or deleted",
        },
        {
            on: "status",
            normalized: "Status",
            Description: "Triggered when the status of a Git commit changes",
        },
        {
            on: "watch",
            normalized: "Watch",
            Description: "Triggered when someone stars the repository",
        },
        {
            on: "workflow_call",
            normalized: "Workflow Call",
            Description:
                "Triggered when another workflow calls this one (reusable workflows)",
        },
    ];
}
