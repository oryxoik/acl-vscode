import { Token } from "../Token";
import { AssignmentExpressionAst } from "./AssignmentExpressionAst";
import { AstType, BaseAst } from "./BaseAst";
import { MethodDefinitionAst } from "./MethodDefinitionAst";

export class ClassDefinitionAst extends BaseAst {
  assignments: AssignmentExpressionAst[];
  methods: Map<Token, MethodDefinitionAst>;

  constructor(token: Token) {
    super(AstType.ClassDefinition, token);
    this.assignments = [];
    this.methods = new Map<Token, MethodDefinitionAst>();
    // this.methods.set("Init", new MethodDefinitionAst(0));
  }

  // getInit(): MethodDefinitionAst | undefined {
  //   return this.methods.get("Init");
  // }

  addMethod(methodName: Token, methodAst: MethodDefinitionAst) {
    this.methods.set(methodName, methodAst);
  }
}
