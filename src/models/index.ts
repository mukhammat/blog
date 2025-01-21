import { User } from './user.model';
import { Post } from './post.model';

// Ассоциация: Один пользователь может иметь много постов, один пост принадлежит одному пользователю
User.hasMany(Post, { foreignKey: "userId", as: "posts" });
Post.belongsTo(User, { foreignKey: "userId", as: "user" });

export { User, Post };