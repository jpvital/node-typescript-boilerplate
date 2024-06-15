import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
// eslint-disable
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type InsertPageMetadataInput = {
  crawlDate: Scalars['String']['input'];
  pageTitle: Scalars['String']['input'];
  url: Scalars['String']['input'];
  wordCount: Scalars['Int']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  insertPageMetadata?: Maybe<WebPageMetadata>;
};


export type MutationInsertPageMetadataArgs = {
  input: InsertPageMetadataInput;
};

export type Query = {
  __typename?: 'Query';
  getPageMetadataByDateRange?: Maybe<Array<Maybe<WebPageMetadata>>>;
  getPageMetadataByPageTitle?: Maybe<Array<Maybe<WebPageMetadata>>>;
  getPageMetadataByUrl?: Maybe<WebPageMetadata>;
  getPageMetadataByWordCount?: Maybe<Array<Maybe<WebPageMetadata>>>;
};


export type QueryGetPageMetadataByDateRangeArgs = {
  endDate: Scalars['String']['input'];
  startDate: Scalars['String']['input'];
};


export type QueryGetPageMetadataByPageTitleArgs = {
  title?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetPageMetadataByUrlArgs = {
  url: Scalars['String']['input'];
};


export type QueryGetPageMetadataByWordCountArgs = {
  count: Scalars['Int']['input'];
};

export type WebPageMetadata = {
  __typename?: 'WebPageMetadata';
  crawlDate: Scalars['String']['output'];
  pageTitle: Scalars['String']['output'];
  url: Scalars['String']['output'];
  wordCount: Scalars['Int']['output'];
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  InsertPageMetadataInput: InsertPageMetadataInput;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  WebPageMetadata: ResolverTypeWrapper<WebPageMetadata>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean']['output'];
  InsertPageMetadataInput: InsertPageMetadataInput;
  Int: Scalars['Int']['output'];
  Mutation: {};
  Query: {};
  String: Scalars['String']['output'];
  WebPageMetadata: WebPageMetadata;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  insertPageMetadata?: Resolver<Maybe<ResolversTypes['WebPageMetadata']>, ParentType, ContextType, RequireFields<MutationInsertPageMetadataArgs, 'input'>>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  getPageMetadataByDateRange?: Resolver<Maybe<Array<Maybe<ResolversTypes['WebPageMetadata']>>>, ParentType, ContextType, RequireFields<QueryGetPageMetadataByDateRangeArgs, 'endDate' | 'startDate'>>;
  getPageMetadataByPageTitle?: Resolver<Maybe<Array<Maybe<ResolversTypes['WebPageMetadata']>>>, ParentType, ContextType, Partial<QueryGetPageMetadataByPageTitleArgs>>;
  getPageMetadataByUrl?: Resolver<Maybe<ResolversTypes['WebPageMetadata']>, ParentType, ContextType, RequireFields<QueryGetPageMetadataByUrlArgs, 'url'>>;
  getPageMetadataByWordCount?: Resolver<Maybe<Array<Maybe<ResolversTypes['WebPageMetadata']>>>, ParentType, ContextType, RequireFields<QueryGetPageMetadataByWordCountArgs, 'count'>>;
};

export type WebPageMetadataResolvers<ContextType = any, ParentType extends ResolversParentTypes['WebPageMetadata'] = ResolversParentTypes['WebPageMetadata']> = {
  crawlDate?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  pageTitle?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  wordCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  WebPageMetadata?: WebPageMetadataResolvers<ContextType>;
};

